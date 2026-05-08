import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { ProfileModel } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class CvPdfService {

  private readonly primary = '#1698d2';
  private readonly dark    = '#1a1a1a';
  private readonly muted   = '#666666';
  private readonly pageW   = 210;
  private readonly margin  = 15;
  private readonly contentW = 180; // 210 - 2*15

  async generate(profile: ProfileModel): Promise<void> {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    let y = 0;

    // ── Photo + Header band ─────────────────────────────────────────────────
    const photoSize = 28; // mm
    const photoX = this.pageW - this.margin - photoSize;
    const photoY = 6;

    let photoData: string | null = null;
    try {
      photoData = await this.loadImageAsCircle(profile.photoUrl, 200);
    } catch { /* skip photo if unavailable */ }

    doc.setFillColor(this.primary);
    doc.rect(0, 0, this.pageW, 40, 'F');

    if (photoData) {
      doc.addImage(photoData, 'PNG', photoX, photoY, photoSize, photoSize);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(profile.name, this.margin, 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(profile.title, this.margin, 26);

    const visibleContacts = profile.contact.filter(c => c.cvVisible !== false);
    if (visibleContacts.length) {
      doc.setFontSize(8);
      const contactLine = visibleContacts.map(c => c.label).join('   ·   ');
      doc.text(contactLine, this.margin, 34);
    }

    y = 48;

    // ── Description ──────────────────────────────────────────────────────────
    doc.setTextColor(this.dark);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    const descLines = doc.splitTextToSize(profile.description, this.contentW);
    doc.text(descLines, this.margin, y);
    y += descLines.length * 4.5 + 7;

    // ── Skills ───────────────────────────────────────────────────────────────
    y = this.sectionTitle(doc, profile.labels.skillsTitle.toUpperCase(), y);
    const labelColW = 38;

    for (const cat of profile.skillCategories) {
      const rowStartY = y;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(this.muted);
      doc.text(cat.name.toUpperCase(), this.margin, y);

      let x = this.margin + labelColW;
      const pillH = 5;

      for (const item of cat.items) {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        const w = doc.getTextWidth(item) + 5;
        if (x + w > this.pageW - this.margin) {
          x = this.margin + labelColW;
          y += pillH + 1.5;
        }
        doc.setFillColor(this.primary);
        doc.roundedRect(x, y - 3.8, w, pillH, 1, 1, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(item, x + 2.5, y);
        x += w + 2;
      }
      y += 7;
    }
    y += 2;

    // ── Education ────────────────────────────────────────────────────────────
    if (profile.education.length) {
      y = this.sectionTitle(doc, profile.labels.educationTitle.toUpperCase(), y);
      for (const edu of profile.education) {
        doc.setTextColor(this.dark);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(edu.degree, this.margin, y);
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(this.muted);
        doc.text(edu.institution + (edu.year ? ` · ${edu.year}` : ''), this.margin, y);
        y += 6;
      }
    }

    // ── Experience ───────────────────────────────────────────────────────────
    if (profile.experience.length) {
      y = this.sectionTitle(doc, profile.labels.experienceTitle.toUpperCase(), y);
      for (const exp of profile.experience) {
        doc.setTextColor(this.dark);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(exp.role, this.margin, y);
        y += 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(this.muted);
        const sub = exp.place
          + (exp.area   ? ` · ${exp.area}`   : '')
          + (exp.period ? ` · ${exp.period}` : '');
        const subLines = doc.splitTextToSize(sub, this.contentW);
        doc.text(subLines, this.margin, y);
        y += subLines.length * 4 + 4;
      }
    }

    // ── Courses ──────────────────────────────────────────────────────────────
    if (profile.courses?.length) {
      y = this.sectionTitle(doc, profile.labels.coursesTitle.toUpperCase(), y);
      for (const course of profile.courses) {
        doc.setTextColor(this.dark);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(course.degree, this.contentW);
        doc.text(lines, this.margin, y);
        y += lines.length * 4.5;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(this.muted);
        doc.text(course.institution + (course.year ? ` · ${course.year}` : ''), this.margin, y);
        y += 6;
      }
    }

    // ── Extra info ───────────────────────────────────────────────────────────
    y = this.sectionTitle(doc, profile.labels.additionalInfoTitle.toUpperCase(), y);
    doc.setFontSize(9);

    const langLabel = profile.labels.languagesLabel + ': ';
    doc.setTextColor(this.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(langLabel, this.margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.languages.join(', '), this.margin + doc.getTextWidth(langLabel), y);
    y += 5;

    const availLabel = profile.labels.availabilityLabel + ': ';
    doc.setFont('helvetica', 'bold');
    doc.text(availLabel, this.margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(profile.availability, this.margin + doc.getTextWidth(availLabel), y);

    doc.save('CV-Alejandro-Tomba.pdf');
  }

  private loadImageAsCircle(src: string, sizePx: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = sizePx;
        canvas.height = sizePx;
        const ctx = canvas.getContext('2d')!;
        ctx.beginPath();
        ctx.arc(sizePx / 2, sizePx / 2, sizePx / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0, sizePx, sizePx);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  private sectionTitle(doc: jsPDF, title: string, y: number): number {
    doc.setFillColor(this.primary);
    doc.rect(this.margin, y, 3, 5.5, 'F');

    doc.setTextColor(this.dark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, this.margin + 5, y + 4.2);

    doc.setDrawColor(this.primary);
    doc.setLineWidth(0.25);
    doc.line(this.margin, y + 6.5, this.margin + this.contentW, y + 6.5);

    return y + 11;
  }
}
