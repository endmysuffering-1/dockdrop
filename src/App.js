import { useState, useEffect } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  ocean:   "#0B3D59",
  sky:     "#1585B5",
  coral:   "#E8501A",
  sand:    "#F5ECD7",
  cream:   "#FDFAF4",
  white:   "#FFFFFF",
  dark:    "#0D1F2D",
  mid:     "#5A7A8A",
  light:   "#E4EEF3",
  gold:    "#C9920F",
  success: "#1A8C5E",
  warn:    "#D4830A",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
`;

// ── STYLES ────────────────────────────────────────────────────────────────────
const css = `
  ${fonts}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ocean: ${T.ocean}; --sky: ${T.sky}; --coral: ${T.coral};
    --sand: ${T.sand}; --cream: ${T.cream}; --white: ${T.white};
    --dark: ${T.dark}; --mid: ${T.mid}; --light: ${T.light};
    --gold: ${T.gold}; --success: ${T.success}; --warn: ${T.warn};
    --radius: 14px; --shadow: 0 2px 20px rgba(11,61,89,0.10);
    --shadow-lg: 0 8px 40px rgba(11,61,89,0.15);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--dark);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  /* AUTH SCREEN */
  .auth-screen {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  .auth-left {
    background: var(--ocean);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .auth-left::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(21,133,181,0.3) 0%, transparent 70%);
    top: -100px; right: -150px;
  }

  .auth-left::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,80,26,0.2) 0%, transparent 70%);
    bottom: 50px; left: -50px;
  }

  .auth-brand { position: relative; z-index: 1; }

  .auth-brand-logo {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 3rem;
  }

  .auth-brand-icon {
    width: 44px; height: 44px;
    background: var(--coral);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
  }

  .auth-brand-name {
    font-family: 'Fraunces', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
  }

  .auth-headline {
    font-family: 'Fraunces', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }

  .auth-headline em {
    font-style: italic;
    color: #7DD4F5;
  }

  .auth-sub {
    color: rgba(255,255,255,0.6);
    font-size: 1rem;
    line-height: 1.6;
    max-width: 380px;
  }

  .auth-features {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; gap: 1rem;
  }

  .auth-feature {
    display: flex; align-items: center; gap: 0.75rem;
    color: rgba(255,255,255,0.8);
    font-size: 0.9rem;
  }

  .auth-feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--coral);
    flex-shrink: 0;
  }

  .auth-right {
    background: var(--cream);
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-form-wrap {
    width: 100%;
    max-width: 420px;
  }

  .auth-form-title {
    font-family: 'Fraunces', serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--ocean);
    margin-bottom: 0.4rem;
    letter-spacing: -0.02em;
  }

  .auth-form-sub {
    color: var(--mid);
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .form-group { margin-bottom: 1.2rem; }

  .form-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--mid);
    margin-bottom: 0.5rem;
  }

  .form-input, .form-select, .form-textarea {
    width: 100%;
    background: white;
    border: 1.5px solid #DDE6EB;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: var(--dark);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: var(--sky);
    box-shadow: 0 0 0 3px rgba(21,133,181,0.12);
  }

  .form-select option { background: white; }
  .form-textarea { resize: vertical; min-height: 80px; }

  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.18s;
    text-decoration: none;
  }

  .btn-primary {
    background: var(--ocean);
    color: white;
  }
  .btn-primary:hover { background: #0A3350; transform: translateY(-1px); box-shadow: var(--shadow); }

  .btn-coral {
    background: var(--coral);
    color: white;
  }
  .btn-coral:hover { opacity: 0.88; transform: translateY(-1px); }

  .btn-ghost {
    background: transparent;
    color: var(--mid);
    border: 1.5px solid #DDE6EB;
  }
  .btn-ghost:hover { background: var(--light); color: var(--ocean); }

  .btn-sm { padding: 0.45rem 0.9rem; font-size: 0.82rem; border-radius: 8px; }
  .btn-full { width: 100%; }

  .auth-toggle {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.88rem;
    color: var(--mid);
  }

  .auth-toggle button {
    background: none; border: none; cursor: pointer;
    color: var(--sky); font-weight: 600; font-size: 0.88rem;
    font-family: 'DM Sans', sans-serif;
    text-decoration: underline;
  }

  /* APP LAYOUT */
  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: var(--ocean);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    position: fixed;
    top: 0; left: 0;
    z-index: 50;
  }

  .sidebar-logo {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 2rem;
  }

  .sidebar-logo-icon {
    width: 34px; height: 34px;
    background: var(--coral);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; flex-shrink: 0;
  }

  .sidebar-logo-text {
    font-family: 'Fraunces', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
  }

  .sidebar-section {
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    padding: 0 0.75rem;
    margin: 1rem 0 0.4rem;
  }

  .sidebar-item {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.65rem 0.75rem;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.15s;
    color: rgba(255,255,255,0.55);
    font-size: 0.88rem;
    font-weight: 500;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    position: relative;
  }

  .sidebar-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .sidebar-item.active { background: rgba(255,255,255,0.13); color: white; }
  .sidebar-item.active::before {
    content: '';
    position: absolute;
    left: 0; top: 20%; bottom: 20%;
    width: 3px;
    background: var(--coral);
    border-radius: 0 3px 3px 0;
  }

  .sidebar-icon { font-size: 1.05rem; width: 20px; text-align: center; }

  .sidebar-badge {
    margin-left: auto;
    background: var(--coral);
    color: white;
    font-size: 0.62rem;
    font-weight: 700;
    padding: 0.15rem 0.45rem;
    border-radius: 20px;
    line-height: 1.4;
  }

  .sidebar-user {
    margin-top: auto;
    padding: 0.75rem;
    background: rgba(255,255,255,0.07);
    border-radius: 10px;
    display: flex; align-items: center; gap: 0.75rem;
  }

  .sidebar-avatar {
    width: 34px; height: 34px;
    background: var(--sky);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    flex-shrink: 0;
  }

  .sidebar-user-name { font-size: 0.85rem; color: white; font-weight: 500; }
  .sidebar-user-plan { font-size: 0.72rem; color: rgba(255,255,255,0.45); }

  /* MAIN */
  .main { margin-left: 240px; flex: 1; min-height: 100vh; }

  .topbar {
    background: white;
    border-bottom: 1px solid #E4EEF3;
    padding: 1rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 40;
  }

  .topbar-title {
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--ocean);
    letter-spacing: -0.01em;
  }

  .topbar-right { display: flex; align-items: center; gap: 1rem; }

  .notif-btn {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: var(--light);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    position: relative;
    transition: background 0.15s;
  }
  .notif-btn:hover { background: #D5E5EE; }

  .notif-dot {
    position: absolute; top: 6px; right: 6px;
    width: 7px; height: 7px;
    background: var(--coral);
    border-radius: 50%;
    border: 1.5px solid white;
  }

  .content { padding: 2rem; }

  /* CARDS */
  .card {
    background: white;
    border-radius: var(--radius);
    border: 1px solid #E4EEF3;
    box-shadow: var(--shadow);
  }

  .card-pad { padding: 1.5rem; }

  .card-title {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--mid);
    margin-bottom: 0.75rem;
  }

  /* STAT CARDS */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-card {
    background: white;
    border: 1px solid #E4EEF3;
    border-radius: var(--radius);
    padding: 1.25rem 1.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow);
  }

  .stat-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent, var(--sky));
    border-radius: 0 0 var(--radius) var(--radius);
  }

  .stat-label { font-size: 0.78rem; color: var(--mid); font-weight: 500; margin-bottom: 0.4rem; }
  .stat-value {
    font-family: 'Fraunces', serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--ocean);
    letter-spacing: -0.02em;
    line-height: 1;
    margin-bottom: 0.3rem;
  }
  .stat-sub { font-size: 0.75rem; color: var(--mid); }

  /* ADDRESS BOX */
  .address-box {
    background: linear-gradient(135deg, var(--ocean) 0%, #0F5276 100%);
    border-radius: var(--radius);
    padding: 1.5rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-lg);
  }

  .address-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.5);
    margin-bottom: 0.5rem;
  }

  .address-text {
    font-size: 0.95rem;
    color: white;
    line-height: 1.65;
    font-weight: 400;
  }

  .address-code {
    font-family: monospace;
    font-size: 1.1rem;
    font-weight: 700;
    color: #7DD4F5;
    display: block;
    margin-bottom: 0.2rem;
  }

  /* TWO COL */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }

  /* PACKAGE ROWS */
  .pkg-list { display: flex; flex-direction: column; gap: 0.6rem; }

  .pkg-row {
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr 1.2fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: white;
    border: 1px solid #E4EEF3;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .pkg-row:hover { border-color: #B8D4E2; box-shadow: var(--shadow); transform: translateY(-1px); }

  .pkg-row.header {
    background: var(--light);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--mid);
    cursor: default;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    border: none;
  }
  .pkg-row.header:hover { transform: none; box-shadow: none; }

  .pkg-name-text { font-weight: 500; font-size: 0.9rem; color: var(--dark); }
  .pkg-tracking { font-size: 0.73rem; color: var(--mid); font-family: monospace; margin-top: 0.15rem; }

  /* STATUS BADGES */
  .badge {
    display: inline-flex; align-items: center; gap: 0.3rem;
    padding: 0.28rem 0.7rem;
    border-radius: 20px;
    font-size: 0.73rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .badge-transit  { background: rgba(212,131,10,0.12);  color: var(--warn); }
  .badge-cleared  { background: rgba(26,140,94,0.12);   color: var(--success); }
  .badge-delivered{ background: rgba(21,133,181,0.12);  color: var(--sky); }
  .badge-pending  { background: rgba(90,122,138,0.1);   color: var(--mid); }
  .badge-active   { background: rgba(232,80,26,0.12);   color: var(--coral); }

  /* TIMELINE */
  .timeline { display: flex; flex-direction: column; }

  .tl-item {
    display: flex; gap: 1rem;
    padding-bottom: 1.25rem;
    position: relative;
  }

  .tl-item:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 14px; top: 30px; bottom: 0;
    width: 1px;
    background: #E4EEF3;
  }

  .tl-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .tl-dot-done    { background: rgba(26,140,94,0.15); color: var(--success); border: 1.5px solid rgba(26,140,94,0.3); }
  .tl-dot-active  { background: rgba(21,133,181,0.15); color: var(--sky); border: 1.5px solid rgba(21,133,181,0.3); }
  .tl-dot-pending { background: #F0F5F8; color: var(--mid); border: 1.5px solid #DDE6EB; }

  .tl-title { font-size: 0.88rem; font-weight: 500; color: var(--dark); }
  .tl-time  { font-size: 0.75rem; color: var(--mid); margin-top: 0.15rem; }

  /* CALCULATOR */
  .calc-result {
    background: linear-gradient(135deg, var(--ocean) 0%, #0F5276 100%);
    border-radius: var(--radius);
    padding: 1.5rem;
    color: white;
  }

  .calc-line {
    display: flex; justify-content: space-between;
    font-size: 0.88rem;
    color: rgba(255,255,255,0.7);
    padding: 0.4rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .calc-line:last-child { border-bottom: none; }
  .calc-line .val { color: white; font-weight: 500; }

  .calc-total {
    display: flex; justify-content: space-between;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.2);
    font-family: 'Fraunces', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
  }

  .calc-tco {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
  }

  .calc-tco-label { font-size: 0.75rem; color: rgba(255,255,255,0.6); margin-bottom: 0.25rem; }
  .calc-tco-val {
    font-family: 'Fraunces', serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
  }

  /* PLANS */
  .plan-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 1.5rem; }

  .plan-card {
    background: white;
    border: 2px solid #E4EEF3;
    border-radius: var(--radius);
    padding: 1.75rem;
    position: relative;
    transition: all 0.2s;
    cursor: pointer;
  }

  .plan-card:hover { border-color: #B8D4E2; box-shadow: var(--shadow-lg); }
  .plan-card.current { border-color: var(--coral); }
  .plan-card.popular { border-color: var(--sky); }

  .plan-pill {
    position: absolute; top: -11px; left: 50%; transform: translateX(-50%);
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.2rem 0.8rem;
    border-radius: 20px;
    color: white;
    white-space: nowrap;
  }

  .plan-pill-current { background: var(--coral); }
  .plan-pill-popular { background: var(--sky); }

  .plan-name {
    font-family: 'Fraunces', serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ocean);
    margin-bottom: 0.2rem;
  }

  .plan-price {
    font-family: 'Fraunces', serif;
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--ocean);
    letter-spacing: -0.03em;
    margin: 0.75rem 0 0.2rem;
    line-height: 1;
  }

  .plan-price span { font-size: 1rem; font-weight: 400; color: var(--mid); }
  .plan-desc { font-size: 0.8rem; color: var(--mid); margin-bottom: 1.25rem; }

  .plan-features { list-style: none; margin: 1rem 0 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }

  .plan-features li {
    font-size: 0.84rem;
    color: #445;
    display: flex; align-items: flex-start; gap: 0.5rem;
  }

  .plan-features li::before { content: '✓'; color: var(--success); font-weight: 700; flex-shrink: 0; }

  /* SCHEDULE */
  .day-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; margin-bottom: 1.5rem; }

  .day-card {
    background: white;
    border: 1.5px solid #E4EEF3;
    border-radius: 10px;
    padding: 0.7rem 0.4rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
  }

  .day-card:hover { border-color: #B8D4E2; background: #F5F9FB; }
  .day-card.active { border-color: var(--sky); background: rgba(21,133,181,0.06); }
  .day-card.has-pkg { border-color: var(--warn); }

  .day-name { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--mid); margin-bottom: 0.25rem; }
  .day-num { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 600; color: var(--ocean); }
  .day-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--warn); margin: 0.3rem auto 0; }

  .slot {
    display: flex; align-items: center; justify-content: space-between;
    background: white;
    border: 1px solid #E4EEF3;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    margin-bottom: 0.75rem;
    transition: all 0.15s;
  }
  .slot:hover { border-color: #B8D4E2; }

  .slot-time { font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 600; color: var(--ocean); }
  .slot-info { font-size: 0.82rem; color: var(--mid); margin-top: 0.1rem; }

  /* DOCUMENTS */
  .doc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }

  .doc-card {
    background: white;
    border: 1px solid #E4EEF3;
    border-radius: 10px;
    padding: 1.1rem 1.25rem;
    display: flex; align-items: center; gap: 1rem;
    transition: all 0.15s;
  }
  .doc-card:hover { border-color: #B8D4E2; }

  .doc-icon {
    width: 42px; height: 42px;
    background: var(--light);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
  }

  .doc-name { font-size: 0.88rem; font-weight: 600; color: var(--dark); }
  .doc-meta { font-size: 0.73rem; color: var(--mid); margin-top: 0.15rem; }

  .upload-zone {
    border: 2px dashed #C8D8E2;
    border-radius: var(--radius);
    padding: 2.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }

  .upload-zone:hover { border-color: var(--sky); background: rgba(21,133,181,0.03); }
  .upload-icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .upload-label { font-size: 0.9rem; color: var(--mid); }
  .upload-label strong { color: var(--sky); }

  /* DIVIDER */
  .divider { height: 1px; background: #E4EEF3; margin: 1.25rem 0; }

  /* PROGRESS BAR */
  .progress-wrap { background: #E4EEF3; border-radius: 20px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 20px; background: var(--sky); transition: width 0.4s; }

  /* WELCOME BANNER */
  .welcome {
    background: linear-gradient(135deg, var(--ocean) 0%, #0F5276 60%, #1585B5 100%);
    border-radius: var(--radius);
    padding: 1.75rem 2rem;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }

  .welcome::before {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    right: -60px; top: -80px;
  }

  .welcome-text { position: relative; z-index: 1; }
  .welcome-greeting { font-size: 0.8rem; color: rgba(255,255,255,0.55); margin-bottom: 0.3rem; font-weight: 500; }
  .welcome-name {
    font-family: 'Fraunces', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
    margin-bottom: 0.3rem;
  }
  .welcome-sub { font-size: 0.85rem; color: rgba(255,255,255,0.6); }

  /* PAGE TRANSITIONS */
  .page-enter { animation: slideIn 0.25s ease; }
  @keyframes slideIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

  /* MISC */
  .text-mid { color: var(--mid); }
  .text-ocean { color: var(--ocean); }
  .text-coral { color: var(--coral); }
  .text-success { color: var(--success); }
  .text-warn { color: var(--warn); }
  .text-sm { font-size: 0.82rem; }
  .text-xs { font-size: 0.72rem; }
  .font-serif { font-family: 'Fraunces', serif; }
  .fw-600 { font-weight: 600; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-1 { gap: 0.5rem; }
  .gap-2 { gap: 1rem; }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const PACKAGES = [
  { id:1, name:"Nike Air Max 270 — Black/White", tracking:"1Z999AA10123456784", carrier:"FedEx", status:"cleared", value:"$189.00", duty:"$34.50", eta:"Ready" },
  { id:2, name:"Apple MacBook Pro 14\" M3", tracking:"1Z999AA10123456785", carrier:"UPS", status:"transit", value:"$1,999.00", duty:"~$380.00", eta:"Mar 29" },
  { id:3, name:"ZARA — Summer Collection (3 items)", tracking:"JD014600004632947", carrier:"DHL", status:"pending", value:"$247.00", duty:"~$47.00", eta:"Mar 31" },
  { id:4, name:"Dyson V15 Vacuum", tracking:"1Z999AA10123456780", carrier:"UPS", status:"delivered", value:"$749.00", duty:"$142.31", eta:"Mar 21" },
  { id:5, name:"Samsung 65\" QLED TV", tracking:"9400111899225290040600", carrier:"USPS", status:"delivered", value:"$1,299.00", duty:"$246.81", eta:"Mar 15" },
];

const STATUS_MAP = {
  transit:   { label:"In Transit",  cls:"badge-transit"   },
  cleared:   { label:"Cleared",     cls:"badge-cleared"   },
  delivered: { label:"Delivered",   cls:"badge-delivered" },
  pending:   { label:"Awaiting",    cls:"badge-pending"   },
};

const DUTY_RATES = [
  { label:"Electronics (35%)",        rate:0.35 },
  { label:"Clothing & Footwear (45%)",rate:0.45 },
  { label:"Books & Educational (10%)",rate:0.10 },
  { label:"Furniture & Home (35%)",   rate:0.35 },
  { label:"Toys & Games (25%)",       rate:0.25 },
  { label:"Alcohol & Tobacco (50%)",  rate:0.50 },
  { label:"Sporting Goods (25%)",     rate:0.25 },
  { label:"Cosmetics & Beauty (35%)", rate:0.35 },
];

const PLANS = [
  { id:"basic",    name:"Basic",    price:29,  desc:"For light shoppers",       pkgs:5,  features:["Up to 5 packages/month","Standard delivery","Email notifications","Duty calculator access"] },
  { id:"standard", name:"Standard", price:79,  desc:"Most popular",             pkgs:15, features:["Up to 15 packages/month","Priority clearance","WhatsApp + SMS alerts","Scheduled delivery windows","Document storage"], current:true },
  { id:"family",   name:"Family",   price:129, desc:"For heavy shoppers",       pkgs:30, features:["Up to 30 packages/month","Express clearance","2 delivery addresses","Priority support","14-day free storage"], popular:true },
];

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Badge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

function CalcView() {
  const [val, setVal]  = useState(500);
  const [ship, setShip]= useState(45);
  const [rateIdx, setRateIdx] = useState(0);

  const rate = DUTY_RATES[rateIdx].rate;
  const cif   = val + ship;
  const duty  = cif * rate;
  const vat   = (cif + duty) * 0.10;
  const proc  = 25;
  const total = duty + vat + proc;
  const tco   = val + ship + total;

  const fmt = n => "$" + n.toFixed(2);

  return (
    <div className="page-enter">
      <div className="two-col">
        <div className="card card-pad">
          <div className="card-title">Item Details</div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-select" value={rateIdx} onChange={e=>setRateIdx(+e.target.value)}>
              {DUTY_RATES.map((r,i)=><option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Item Value (USD)</label>
            <input className="form-input" type="number" value={val} onChange={e=>setVal(+e.target.value||0)} />
          </div>
          <div className="form-group">
            <label className="form-label">Shipping Cost (USD)</label>
            <input className="form-input" type="number" value={ship} onChange={e=>setShip(+e.target.value||0)} />
          </div>
          <div className="form-group">
            <label className="form-label">Country of Origin</label>
            <select className="form-select">
              {["United States","United Kingdom","China","Canada","Germany","Japan"].map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <div className="calc-result">
            <div style={{fontFamily:"'Fraunces',serif",fontSize:"1rem",fontWeight:600,marginBottom:"0.75rem",color:"rgba(255,255,255,0.7)"}}>Estimate Breakdown</div>
            {[["Item Value",fmt(val)],["Shipping",fmt(ship)],["CIF Value",fmt(cif)],[`Import Duty (${(rate*100).toFixed(0)}%)`,fmt(duty)],["VAT (10%)",fmt(vat)],["Processing Fee",fmt(proc)]].map(([l,v])=>(
              <div className="calc-line" key={l}><span>{l}</span><span className="val">{v}</span></div>
            ))}
            <div className="calc-total"><span>Total Duties & Fees</span><span>{fmt(total)}</span></div>
            <div className="calc-tco">
              <div className="calc-tco-label">Total Cost of Ownership</div>
              <div className="calc-tco-val">{fmt(tco)}</div>
            </div>
          </div>
          <div className="card card-pad" style={{marginTop:"1rem"}}>
            <div style={{fontSize:"0.78rem",color:"var(--mid)",lineHeight:1.5}}>
              ⚠️ This is an estimate. Final duties are determined at clearance by the Bahamas Customs & Excise Department.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleView() {
  const [selected, setSelected] = useState(4);
  const days = [
    {name:"Mon",num:23},{name:"Tue",num:24,pkg:true},{name:"Wed",num:25},
    {name:"Thu",num:26},{name:"Fri",num:27},{name:"Sat",num:28},{name:"Sun",num:29}
  ];
  const slots = [
    {time:"Tuesday, April 1",info:"10:00 AM – 2:00 PM · East Nassau"},
    {time:"Thursday, April 3",info:"2:00 PM – 6:00 PM · West Nassau"},
    {time:"Saturday, April 5",info:"9:00 AM – 1:00 PM · All Areas"},
  ];
  return (
    <div className="page-enter">
      <div className="card card-pad" style={{marginBottom:"1.5rem"}}>
        <div className="card-title">April 2026</div>
        <div className="day-grid">
          {days.map((d,i)=>(
            <div key={i} className={`day-card${i===selected?" active":""}${d.pkg?" has-pkg":""}`} onClick={()=>setSelected(i)}>
              <div className="day-name">{d.name}</div>
              <div className="day-num">{d.num}</div>
              {d.pkg && <div className="day-dot" />}
            </div>
          ))}
        </div>
      </div>
      <div className="two-col">
        <div>
          <div className="card-title mb-1">Available Slots</div>
          {slots.map((s,i)=>(
            <div className="slot" key={i}>
              <div>
                <div className="slot-time">{s.time}</div>
                <div className="slot-info">{s.info}</div>
              </div>
              <button className={`btn btn-sm ${i===0?"btn-coral":"btn-ghost"}`}>{i===0?"Book Now":"Select"}</button>
            </div>
          ))}
        </div>
        <div className="card card-pad">
          <div className="card-title">Delivery Address</div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{fontWeight:600,marginBottom:"0.25rem"}}>Home — Nassau</div>
            <div className="text-sm text-mid">14 Coral Harbour Rd, Nassau, New Providence</div>
          </div>
          <div className="form-group">
            <label className="form-label">Delivery Instructions</label>
            <textarea className="form-textarea" placeholder="Gate code, landmark, special instructions..." />
          </div>
          <button className="btn btn-ghost btn-full">Update Address</button>
        </div>
      </div>
    </div>
  );
}

function DocumentsView() {
  const docs = [
    {icon:"🪪",name:"Government ID",meta:"Passport · Mar 1, 2026",status:"verified"},
    {icon:"🏠",name:"Proof of Address",meta:"Utility Bill · Mar 1, 2026",status:"verified"},
    {icon:"📋",name:"Commercial Invoice",meta:"MacBook Order · Mar 24",status:"pending"},
    {icon:"📦",name:"Packing List",meta:"ZARA Order · Not uploaded",status:"required"},
  ];
  const entries = [
    {ref:"BS-2026-00419",desc:"Nike Air Max",date:"Mar 26",duty:"$34.50"},
    {ref:"BS-2026-00388",desc:"Dyson V15",date:"Mar 20",duty:"$142.31"},
  ];
  return (
    <div className="page-enter">
      <div className="doc-grid">
        {docs.map((d,i)=>(
          <div className="doc-card" key={i}>
            <div className="doc-icon">{d.icon}</div>
            <div style={{flex:1}}>
              <div className="doc-name">{d.name}</div>
              <div className="doc-meta">{d.meta}</div>
            </div>
            <span className={`badge ${d.status==="verified"?"badge-cleared":d.status==="pending"?"badge-transit":"badge-active"}`}
              style={{marginLeft:"auto"}}>
              {d.status==="verified"?"Verified":d.status==="pending"?"Pending":"Required"}
            </span>
          </div>
        ))}
      </div>
      <div className="upload-zone mb-2" onClick={()=>alert("File upload — connect to Supabase Storage")}>
        <div className="upload-icon">☁️</div>
        <div className="upload-label"><strong>Click to upload</strong> or drag and drop</div>
        <div className="upload-label" style={{marginTop:"0.3rem",fontSize:"0.78rem"}}>PDF, JPG, PNG · Max 10MB</div>
      </div>
      <div className="card card-pad">
        <div className="card-title">Clearance Documents</div>
        {entries.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0.85rem 0",borderBottom:i<entries.length-1?"1px solid #E4EEF3":"none"}}>
            <div>
              <div className="fw-600 text-sm">Entry #{e.ref} — {e.desc}</div>
              <div className="text-xs text-mid">Cleared {e.date} · Duty paid {e.duty}</div>
            </div>
            <button className="btn btn-ghost btn-sm">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionView() {
  const [current, setCurrent] = useState("standard");
  return (
    <div className="page-enter">
      <div className="plan-grid">
        {PLANS.map(p=>(
          <div key={p.id} className={`plan-card${p.current?" current":""}${p.popular?" popular":""}`} onClick={()=>setCurrent(p.id)}>
            {p.current && <div className="plan-pill plan-pill-current">Current Plan</div>}
            {p.popular && <div className="plan-pill plan-pill-popular">Best Value</div>}
            <div className="plan-name">{p.name}</div>
            <div className="text-sm text-mid">{p.desc}</div>
            <div className="plan-price">${p.price}<span>/mo</span></div>
            <ul className="plan-features">
              {p.features.map((f,i)=><li key={i}>{f}</li>)}
            </ul>
            <button className={`btn btn-full ${p.current?"btn-ghost":"btn-coral"}`} style={p.current?{opacity:0.6,cursor:"default"}:{}}>
              {p.current?"Current Plan":"Upgrade →"}
            </button>
          </div>
        ))}
      </div>
      <div className="card card-pad">
        <div className="flex items-center justify-between">
          <div>
            <div className="fw-600">Standard Plan — $79/month</div>
            <div className="text-sm text-mid mt-1">Next charge: April 1, 2026 · Visa ending 4242</div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm">Update Payment</button>
            <button className="btn btn-ghost btn-sm text-coral">Cancel Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackagesView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = PACKAGES.filter(p=>{
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter==="all" || p.status===filter;
    return matchSearch && matchFilter;
  });
  return (
    <div className="page-enter">
      <div className="flex items-center gap-2 mb-2" style={{flexWrap:"wrap"}}>
        <input className="form-input" style={{maxWidth:280}} placeholder="🔍 Search packages..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="form-select" style={{maxWidth:180}} value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="transit">In Transit</option>
          <option value="cleared">Cleared</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Awaiting</option>
        </select>
        <button className="btn btn-coral btn-sm" style={{marginLeft:"auto"}}>+ Add Package</button>
      </div>
      <div className="pkg-list">
        <div className="pkg-row header">
          <div>Package</div><div>Status</div><div>Value</div><div>Est. Duty</div><div>ETA</div>
        </div>
        {filtered.map(p=>(
          <div className="pkg-row" key={p.id}>
            <div>
              <div className="pkg-name-text">{p.name}</div>
              <div className="pkg-tracking">{p.tracking} · {p.carrier}</div>
            </div>
            <div><Badge status={p.status} /></div>
            <div className="text-sm fw-600">{p.value}</div>
            <div className="text-sm" style={{color:p.duty.startsWith("~")?"var(--mid)":"var(--warn)"}}>{p.duty}</div>
            <div className="text-sm">{p.eta}</div>
          </div>
        ))}
        {filtered.length===0 && (
          <div className="card card-pad" style={{textAlign:"center",color:"var(--mid)",padding:"2rem"}}>
            No packages match your search.
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ onNav }) {
  return (
    <div className="page-enter">
      <div className="welcome">
        <div className="welcome-text">
          <div className="welcome-greeting">Saturday, March 28 · Good morning</div>
          <div className="welcome-name">👋 Welcome back, Marcus</div>
          <div className="welcome-sub">2 packages arriving this week · 1 ready for delivery</div>
        </div>
        <button className="btn btn-coral" onClick={()=>onNav("packages")}>+ Add Package</button>
      </div>

      <div className="stats-grid">
        {[
          {label:"Active Packages",    value:"3",    sub:"2 transit · 1 cleared", accent:"var(--sky)"},
          {label:"Delivered This Month",value:"7",   sub:"↑ 2 more than last month", accent:"var(--success)"},
          {label:"Duties Paid",         value:"$284", sub:"This billing cycle", accent:"var(--warn)"},
          {label:"Next Delivery",       value:"Tue",  sub:"March 28 · 10am–2pm", accent:"var(--coral)"},
        ].map((s,i)=>(
          <div className="stat-card" key={i} style={{"--accent":s.accent}}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="address-box">
        <div>
          <div className="address-label">Your Miami Receiving Address</div>
          <div className="address-text">
            <span className="address-code">Marcus Johnson — DD-4821</span>
            3850 NW 79th Ave, Suite 400<br/>Miami, FL 33166, USA
          </div>
        </div>
        <button className="btn btn-ghost" style={{borderColor:"rgba(255,255,255,0.2)",color:"white",background:"rgba(255,255,255,0.1)"}}
          onClick={()=>{navigator.clipboard?.writeText("3850 NW 79th Ave, Suite 400, Miami, FL 33166"); alert("Address copied!");}}>
          📋 Copy Address
        </button>
      </div>

      <div className="two-col">
        <div className="card card-pad">
          <div className="card-title">Recent Activity</div>
          <div className="timeline">
            {[
              {dot:"done",  title:"Nike Air Max 270 — Cleared",         sub:"Ready for delivery · Duty: $34.50"},
              {dot:"active",title:"Apple MacBook Pro 14\"",              sub:"In transit · Miami ETA: Mar 29"},
              {dot:"pending",title:"ZARA — 3 items",                    sub:"Awaiting arrival · Shipped Mar 25"},
            ].map((t,i)=>(
              <div className="tl-item" key={i}>
                <div className={`tl-dot tl-dot-${t.dot}`}>{t.dot==="done"?"✓":t.dot==="active"?"→":"○"}</div>
                <div>
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-time">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-title">Subscription</div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:"1.3rem",fontWeight:600,color:"var(--ocean)"}}>Standard Plan</div>
            <div className="text-sm text-mid mt-1">$79 / month · Renews Apr 1</div>
          </div>
          <div style={{background:"var(--light)",borderRadius:10,padding:"1rem",marginBottom:"1rem"}}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-mid">Packages used</span>
              <span className="fw-600">9 / 15</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-fill" style={{width:"60%"}} />
            </div>
          </div>
          <button className="btn btn-ghost btn-full" onClick={()=>onNav("subscription")}>Manage Plan →</button>
        </div>
      </div>
    </div>
  );
}

// ── AUTH SCREENS ──────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email:"", password:"", name:"", address:"" });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const submit = () => {
    if (!form.email || !form.password) return alert("Please fill in all required fields.");
    onAuth({ name: form.name||"Marcus Johnson", email: form.email });
  };

  return (
    <div className="auth-screen">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <div className="auth-brand-icon">📦</div>
            <div className="auth-brand-name">DockDrop</div>
          </div>
          <div className="auth-headline">
            Shop anywhere.<br/><em>Delivered</em> to your door in Nassau.
          </div>
          <div className="auth-sub">
            Your personal Miami address, automatic customs clearance, and guaranteed 48-hour home delivery — all in one subscription.
          </div>
        </div>
        <div className="auth-features">
          {["Personal US shipping address included","Automatic customs clearance on every package","Upfront duty estimates — no surprise fees","Scheduled Nassau home delivery with live tracking"].map((f,i)=>(
            <div className="auth-feature" key={i}>
              <div className="auth-feature-dot" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-title">{mode==="login"?"Welcome back":"Create account"}</div>
          <div className="auth-form-sub">
            {mode==="login"?"Sign in to your DockDrop account":"Start receiving packages in Nassau today"}
          </div>

          {mode==="signup" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Marcus Johnson" value={form.name} onChange={e=>upd("name",e.target.value)} />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>upd("email",e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e=>upd("password",e.target.value)} />
          </div>

          {mode==="signup" && (
            <div className="form-group">
              <label className="form-label">Nassau Delivery Address</label>
              <input className="form-input" placeholder="14 Coral Harbour Rd, Nassau" value={form.address} onChange={e=>upd("address",e.target.value)} />
            </div>
          )}

          <button className="btn btn-coral btn-full" style={{marginTop:"0.5rem",padding:"0.9rem"}} onClick={submit}>
            {mode==="login"?"Sign In →":"Create Account →"}
          </button>

          {mode==="login" && (
            <button className="btn btn-ghost btn-full" style={{marginTop:"0.75rem"}} onClick={submit}>
              Continue as Demo User
            </button>
          )}

          <div className="auth-toggle">
            {mode==="login" ? <>Don't have an account? <button onClick={()=>setMode("signup")}>Sign up free</button></> : <>Already have an account? <button onClick={()=>setMode("login")}>Sign in</button></>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",    icon:"🏠", label:"Dashboard",    section:"Main" },
  { id:"packages",     icon:"📦", label:"My Packages",  section:"Main",    badge:"3" },
  { id:"calculator",   icon:"🧮", label:"Duty Calculator", section:"Main" },
  { id:"schedule",     icon:"📅", label:"Schedule",     section:"Delivery" },
  { id:"documents",    icon:"📄", label:"Documents",    section:"Delivery" },
  { id:"subscription", icon:"⭐", label:"Subscription", section:"Account" },
];

const PAGE_TITLES = {
  dashboard:"Dashboard", packages:"My Packages", calculator:"Duty Calculator",
  schedule:"Delivery Schedule", documents:"Documents", subscription:"Subscription",
};

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const sections = [...new Set(NAV.map(n=>n.section))];

  const renderPage = () => {
    switch(page) {
      case "dashboard":    return <Dashboard onNav={setPage} />;
      case "packages":     return <PackagesView />;
      case "calculator":   return <CalcView />;
      case "schedule":     return <ScheduleView />;
      case "documents":    return <DocumentsView />;
      case "subscription": return <SubscriptionView />;
      default:             return <Dashboard onNav={setPage} />;
    }
  };

  if (!user) return (
    <>
      <style>{css}</style>
      <AuthScreen onAuth={setUser} />
    </>
  );

  const initials = user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">📦</div>
            <div className="sidebar-logo-text">DockDrop</div>
          </div>

          {sections.map(sec=>(
            <div key={sec}>
              <div className="sidebar-section">{sec}</div>
              {NAV.filter(n=>n.section===sec).map(n=>(
                <button key={n.id} className={`sidebar-item${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
                  <span className="sidebar-icon">{n.icon}</span>
                  {n.label}
                  {n.badge && <span className="sidebar-badge">{n.badge}</span>}
                </button>
              ))}
            </div>
          ))}

          <div style={{marginTop:"1rem"}}>
            <div className="sidebar-section">Account</div>
            <button className="sidebar-item"><span className="sidebar-icon">⚙️</span>Settings</button>
            <button className="sidebar-item" onClick={()=>setUser(null)}><span className="sidebar-icon">↩</span>Sign Out</button>
          </div>

          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div>
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-plan">Standard Plan · DD-4821</div>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
            <div className="topbar-right">
              <button className="notif-btn">🔔<div className="notif-dot" /></button>
              <button className="btn btn-ghost btn-sm" onClick={()=>setUser(null)}>Sign Out</button>
            </div>
          </div>
          <div className="content">{renderPage()}</div>
        </div>
      </div>
    </>
  );
}
