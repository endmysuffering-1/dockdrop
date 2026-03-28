import { useState } from "react";
const T={ocean:"#0B3D59",sky:"#1585B5",coral:"#E8501A",cream:"#FDFAF4",white:"#FFFFFF",dark:"#0D1F2D",mid:"#5A7A8A",light:"#E4EEF3",success:"#1A8C5E",warn:"#D4830A"};
const css=`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--ocean:${T.ocean};--sky:${T.sky};--coral:${T.coral};--cream:${T.cream};--white:${T.white};--dark:${T.dark};--mid:${T.mid};--light:${T.light};--success:${T.success};--warn:${T.warn};--radius:14px;--shadow:0 2px 20px rgba(11,61,89,.10);--shadow-lg:0 8px 40px rgba(11,61,89,.15)}
  html{scroll-behavior:smooth}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--dark);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  .auth-screen{min-height:100vh;display:grid;grid-template-columns:1fr 1fr}
  @media(max-width:700px){.auth-screen{grid-template-columns:1fr}.auth-left{display:none}.auth-right{padding:2rem 1.25rem}}
  .auth-left{background:var(--ocean);padding:3rem;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .auth-left::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(21,133,181,.3) 0%,transparent 70%);top:-100px;right:-150px}
  .auth-brand-logo{display:flex;align-items:center;gap:.75rem;margin-bottom:3rem;position:relative;z-index:1}
  .auth-brand-icon{width:44px;height:44px;background:var(--coral);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
  .auth-brand-name{font-family:'Fraunces',serif;font-size:1.6rem;font-weight:700;color:white;letter-spacing:-.02em}
  .auth-headline{font-family:'Fraunces',serif;font-size:2.6rem;font-weight:700;color:white;line-height:1.15;letter-spacing:-.02em;margin-bottom:1.5rem;position:relative;z-index:1}
  .auth-headline em{font-style:italic;color:#7DD4F5}
  .auth-sub{color:rgba(255,255,255,.6);font-size:.95rem;line-height:1.65;max-width:380px;position:relative;z-index:1}
  .auth-features{display:flex;flex-direction:column;gap:1rem;position:relative;z-index:1}
  .auth-feature{display:flex;align-items:center;gap:.75rem;color:rgba(255,255,255,.8);font-size:.88rem}
  .auth-feature-dot{width:8px;height:8px;border-radius:50%;background:var(--coral);flex-shrink:0}
  .auth-right{background:var(--cream);padding:3rem;display:flex;align-items:center;justify-content:center}
  .auth-form-wrap{width:100%;max-width:420px}
  .auth-mobile-logo{display:none;align-items:center;gap:.6rem;margin-bottom:2rem}
  @media(max-width:700px){.auth-mobile-logo{display:flex}}
  .auth-mobile-icon{width:38px;height:38px;background:var(--coral);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
  .auth-mobile-name{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:700;color:var(--ocean);letter-spacing:-.02em}
  .auth-form-title{font-family:'Fraunces',serif;font-size:1.8rem;font-weight:600;color:var(--ocean);margin-bottom:.4rem;letter-spacing:-.02em}
  .auth-form-sub{color:var(--mid);font-size:.9rem;margin-bottom:2rem}
  .form-group{margin-bottom:1.2rem}
  .form-label{display:block;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--mid);margin-bottom:.5rem}
  .form-input,.form-select,.form-textarea{width:100%;background:white;border:1.5px solid #DDE6EB;border-radius:10px;padding:.75rem 1rem;font-family:'DM Sans',sans-serif;font-size:.95rem;color:var(--dark);outline:none;transition:border-color .2s,box-shadow .2s;-webkit-appearance:none}
  .form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--sky);box-shadow:0 0 0 3px rgba(21,133,181,.12)}
  .form-select option{background:white}
  .form-textarea{resize:vertical;min-height:80px}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:.75rem 1.5rem;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:600;cursor:pointer;border:none;transition:all .18s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  .btn-primary{background:var(--ocean);color:white}
  .btn-primary:hover{background:#0A3350;transform:translateY(-1px)}
  .btn-coral{background:var(--coral);color:white}
  .btn-coral:hover{opacity:.88;transform:translateY(-1px)}
  .btn-ghost{background:transparent;color:var(--mid);border:1.5px solid #DDE6EB}
  .btn-ghost:hover{background:var(--light);color:var(--ocean)}
  .btn-sm{padding:.45rem .9rem;font-size:.82rem;border-radius:8px}
  .btn-full{width:100%}
  .auth-toggle{text-align:center;margin-top:1.5rem;font-size:.88rem;color:var(--mid)}
  .auth-toggle button{background:none;border:none;cursor:pointer;color:var(--sky);font-weight:600;font-size:.88rem;font-family:'DM Sans',sans-serif;text-decoration:underline}
  .app{display:flex;min-height:100vh}
  .sidebar{width:240px;min-height:100vh;background:var(--ocean);display:flex;flex-direction:column;padding:1.5rem 1rem;position:fixed;top:0;left:0;z-index:200;transition:transform .25s ease}
  @media(max-width:768px){.sidebar{transform:translateX(-100%);box-shadow:4px 0 30px rgba(0,0,0,.2)}.sidebar.open{transform:translateX(0)}}
  .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:199}
  @media(max-width:768px){.sidebar-overlay.show{display:block}}
  .sidebar-logo{display:flex;align-items:center;gap:.6rem;padding:.5rem .75rem;margin-bottom:2rem}
  .sidebar-logo-icon{width:34px;height:34px;background:var(--coral);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
  .sidebar-logo-text{font-family:'Fraunces',serif;font-size:1.25rem;font-weight:700;color:white;letter-spacing:-.02em}
  .sidebar-section{font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);padding:0 .75rem;margin:1rem 0 .4rem}
  .sidebar-item{display:flex;align-items:center;gap:.75rem;padding:.65rem .75rem;border-radius:9px;cursor:pointer;transition:all .15s;color:rgba(255,255,255,.55);font-size:.88rem;font-weight:500;border:none;background:none;width:100%;text-align:left;position:relative;touch-action:manipulation}
  .sidebar-item:hover{background:rgba(255,255,255,.08);color:white}
  .sidebar-item.active{background:rgba(255,255,255,.13);color:white}
  .sidebar-item.active::before{content:'';position:absolute;left:0;top:20%;bottom:20%;width:3px;background:var(--coral);border-radius:0 3px 3px 0}
  .sidebar-icon{font-size:1.05rem;width:20px;text-align:center}
  .sidebar-badge{margin-left:auto;background:var(--coral);color:white;font-size:.62rem;font-weight:700;padding:.15rem .45rem;border-radius:20px}
  .sidebar-user{margin-top:auto;padding:.75rem;background:rgba(255,255,255,.07);border-radius:10px;display:flex;align-items:center;gap:.75rem}
  .sidebar-avatar{width:34px;height:34px;background:var(--sky);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:600;color:white;flex-shrink:0}
  .sidebar-user-name{font-size:.85rem;color:white;font-weight:500}
  .sidebar-user-plan{font-size:.72rem;color:rgba(255,255,255,.45)}
  .main{margin-left:240px;flex:1;min-height:100vh}
  @media(max-width:768px){.main{margin-left:0;padding-bottom:70px}}
  .topbar{background:white;border-bottom:1px solid #E4EEF3;padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
  .topbar-left{display:flex;align-items:center;gap:.75rem}
  .topbar-title{font-family:'Fraunces',serif;font-size:1.2rem;font-weight:600;color:var(--ocean);letter-spacing:-.01em}
  .topbar-right{display:flex;align-items:center;gap:.75rem}
  .menu-btn{display:none;width:36px;height:36px;border-radius:9px;background:var(--light);border:none;cursor:pointer;align-items:center;justify-content:center;font-size:1.1rem;touch-action:manipulation}
  @media(max-width:768px){.menu-btn{display:flex}}
  .notif-btn{width:36px;height:36px;border-radius:9px;background:var(--light);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;position:relative}
  .notif-dot{position:absolute;top:6px;right:6px;width:7px;height:7px;background:var(--coral);border-radius:50%;border:1.5px solid white}
  .content{padding:1.5rem}
  @media(max-width:768px){.content{padding:1rem}}
  .bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--ocean);border-top:1px solid rgba(255,255,255,.1);padding:.5rem 0;z-index:150;padding-bottom:env(safe-area-inset-bottom)}
  @media(max-width:768px){.bottom-nav{display:flex}}
  .bottom-nav-items{display:flex;width:100%;justify-content:space-around}
  .bottom-nav-item{display:flex;flex-direction:column;align-items:center;gap:.2rem;padding:.4rem .5rem;flex:1;border:none;background:none;cursor:pointer;color:rgba(255,255,255,.45);transition:color .15s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  .bottom-nav-item.active{color:white}
  .bottom-nav-icon{font-size:1.2rem;position:relative}
  .bottom-nav-badge{position:absolute;top:-4px;right:-6px;background:var(--coral);color:white;font-size:.5rem;font-weight:700;padding:.1rem .3rem;border-radius:10px}
  .bottom-nav-label{font-size:.6rem;font-weight:600}
  .card{background:white;border-radius:var(--radius);border:1px solid #E4EEF3;box-shadow:var(--shadow)}
  .card-pad{padding:1.25rem}
  @media(max-width:480px){.card-pad{padding:1rem}}
  .card-title{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--mid);margin-bottom:.75rem}
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem}
  @media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:400px){.stats-grid{gap:.75rem}}
  .stat-card{background:white;border:1px solid #E4EEF3;border-radius:var(--radius);padding:1.1rem 1.25rem;position:relative;overflow:hidden;box-shadow:var(--shadow)}
  @media(max-width:480px){.stat-card{padding:.9rem 1rem}}
  .stat-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--accent,var(--sky));border-radius:0 0 var(--radius) var(--radius)}
  .stat-label{font-size:.72rem;color:var(--mid);font-weight:500;margin-bottom:.3rem}
  .stat-value{font-family:'Fraunces',serif;font-size:1.7rem;font-weight:700;color:var(--ocean);letter-spacing:-.02em;line-height:1;margin-bottom:.25rem}
  @media(max-width:480px){.stat-value{font-size:1.4rem}}
  .stat-sub{font-size:.7rem;color:var(--mid)}
  .address-box{background:linear-gradient(135deg,var(--ocean) 0%,#0F5276 100%);border-radius:var(--radius);padding:1.4rem 1.5rem;display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;box-shadow:var(--shadow-lg);gap:1rem;flex-wrap:wrap}
  .address-label{font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:rgba(255,255,255,.5);margin-bottom:.4rem}
  .address-text{font-size:.9rem;color:white;line-height:1.65}
  .address-code{font-family:monospace;font-size:1rem;font-weight:700;color:#7DD4F5;display:block;margin-bottom:.2rem}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
  @media(max-width:700px){.two-col{grid-template-columns:1fr}}
  .pkg-list{display:flex;flex-direction:column;gap:.6rem}
  .pkg-row{display:grid;grid-template-columns:2.5fr 1fr 1fr 1.2fr 1fr;align-items:center;gap:.75rem;padding:1rem 1.25rem;background:white;border:1px solid #E4EEF3;border-radius:10px;cursor:pointer;transition:all .15s}
  .pkg-row:hover{border-color:#B8D4E2;box-shadow:var(--shadow);transform:translateY(-1px)}
  .pkg-row.header{background:var(--light);font-size:.68rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--mid);cursor:default;padding:.6rem 1.25rem;border-radius:8px;border:none}
  .pkg-row.header:hover{transform:none;box-shadow:none}
  @media(max-width:700px){.pkg-row.header{display:none}.pkg-row{grid-template-columns:1fr auto;grid-template-rows:auto auto;gap:.4rem .75rem}.pkg-col-value,.pkg-col-duty,.pkg-col-eta{display:none}.pkg-col-name{grid-column:1}.pkg-col-status{grid-column:2;grid-row:1/3;align-self:center}}
  .pkg-name-text{font-weight:500;font-size:.88rem;color:var(--dark)}
  .pkg-tracking{font-size:.72rem;color:var(--mid);font-family:monospace;margin-top:.1rem}
  .badge{display:inline-flex;align-items:center;gap:.3rem;padding:.28rem .65rem;border-radius:20px;font-size:.72rem;font-weight:600;white-space:nowrap}
  .badge::before{content:'';width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0}
  .badge-transit{background:rgba(212,131,10,.12);color:var(--warn)}
  .badge-cleared{background:rgba(26,140,94,.12);color:var(--success)}
  .badge-delivered{background:rgba(21,133,181,.12);color:var(--sky)}
  .badge-pending{background:rgba(90,122,138,.1);color:var(--mid)}
  .timeline{display:flex;flex-direction:column}
  .tl-item{display:flex;gap:1rem;padding-bottom:1.2rem;position:relative}
  .tl-item:not(:last-child)::before{content:'';position:absolute;left:13px;top:28px;bottom:0;width:1px;background:#E4EEF3}
  .tl-dot{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.73rem;flex-shrink:0;margin-top:2px}
  .tl-dot-done{background:rgba(26,140,94,.15);color:var(--success);border:1.5px solid rgba(26,140,94,.3)}
  .tl-dot-active{background:rgba(21,133,181,.15);color:var(--sky);border:1.5px solid rgba(21,133,181,.3)}
  .tl-dot-pending{background:#F0F5F8;color:var(--mid);border:1.5px solid #DDE6EB}
  .tl-title{font-size:.86rem;font-weight:500;color:var(--dark)}
  .tl-time{font-size:.74rem;color:var(--mid);margin-top:.12rem}
  .calc-result{background:linear-gradient(135deg,var(--ocean) 0%,#0F5276 100%);border-radius:var(--radius);padding:1.4rem;color:white}
  .calc-line{display:flex;justify-content:space-between;font-size:.86rem;color:rgba(255,255,255,.7);padding:.38rem 0;border-bottom:1px solid rgba(255,255,255,.08)}
  .calc-line:last-child{border-bottom:none}
  .calc-line .val{color:white;font-weight:500}
  .calc-total{display:flex;justify-content:space-between;margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.2);font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;color:white}
  .calc-tco{background:rgba(255,255,255,.1);border-radius:10px;padding:1rem;margin-top:1rem;text-align:center}
  .calc-tco-label{font-size:.73rem;color:rgba(255,255,255,.6);margin-bottom:.25rem}
  .calc-tco-val{font-family:'Fraunces',serif;font-size:2rem;font-weight:700;color:white;letter-spacing:-.02em}
  .plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;margin-bottom:1.5rem}
  @media(max-width:750px){.plan-grid{grid-template-columns:1fr}}
  .plan-card{background:white;border:2px solid #E4EEF3;border-radius:var(--radius);padding:1.5rem;position:relative;transition:all .2s;cursor:pointer}
  .plan-card:hover{border-color:#B8D4E2;box-shadow:var(--shadow-lg)}
  .plan-card.current{border-color:var(--coral)}
  .plan-card.popular{border-color:var(--sky)}
  .plan-pill{position:absolute;top:-11px;left:50%;transform:translateX(-50%);font-size:.63rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .75rem;border-radius:20px;color:white;white-space:nowrap}
  .plan-pill-current{background:var(--coral)}
  .plan-pill-popular{background:var(--sky)}
  .plan-name{font-family:'Fraunces',serif;font-size:1.05rem;font-weight:600;color:var(--ocean);margin-bottom:.2rem}
  .plan-price{font-family:'Fraunces',serif;font-size:2.2rem;font-weight:700;color:var(--ocean);letter-spacing:-.03em;margin:.6rem 0 .2rem;line-height:1}
  .plan-price span{font-size:.95rem;font-weight:400;color:var(--mid)}
  .plan-features{list-style:none;margin:.9rem 0 1.25rem;display:flex;flex-direction:column;gap:.45rem}
  .plan-features li{font-size:.82rem;color:#445;display:flex;align-items:flex-start;gap:.45rem}
  .plan-features li::before{content:'✓';color:var(--success);font-weight:700;flex-shrink:0}
  .day-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:.45rem;margin-bottom:1.5rem}
  @media(max-width:480px){.day-grid{gap:.3rem}}
  .day-card{background:white;border:1.5px solid #E4EEF3;border-radius:9px;padding:.65rem .3rem;text-align:center;cursor:pointer;transition:all .15s}
  .day-card:hover{border-color:#B8D4E2;background:#F5F9FB}
  .day-card.active{border-color:var(--sky);background:rgba(21,133,181,.06)}
  .day-card.has-pkg{border-color:var(--warn)}
  .day-name{font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mid);margin-bottom:.2rem}
  .day-num{font-family:'Fraunces',serif;font-size:1rem;font-weight:600;color:var(--ocean)}
  .day-dot{width:5px;height:5px;border-radius:50%;background:var(--warn);margin:.25rem auto 0}
  .slot{display:flex;align-items:center;justify-content:space-between;background:white;border:1px solid #E4EEF3;border-radius:10px;padding:.9rem 1.1rem;margin-bottom:.65rem;transition:all .15s;gap:.75rem}
  .slot:hover{border-color:#B8D4E2}
  .slot-time{font-family:'Fraunces',serif;font-size:.95rem;font-weight:600;color:var(--ocean)}
  .slot-info{font-size:.8rem;color:var(--mid);margin-top:.1rem}
  .doc-grid{display:grid;grid-template-columns:1fr 1fr;gap:.9rem;margin-bottom:1.25rem}
  @media(max-width:600px){.doc-grid{grid-template-columns:1fr}}
  .doc-card{background:white;border:1px solid #E4EEF3;border-radius:10px;padding:1rem 1.1rem;display:flex;align-items:center;gap:.9rem;transition:all .15s}
  .doc-card:hover{border-color:#B8D4E2}
  .doc-icon{width:40px;height:40px;background:var(--light);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.15rem;flex-shrink:0}
  .doc-name{font-size:.86rem;font-weight:600;color:var(--dark)}
  .doc-meta{font-size:.7rem;color:var(--mid);margin-top:.12rem}
  .upload-zone{border:2px dashed #C8D8E2;border-radius:var(--radius);padding:2rem;text-align:center;cursor:pointer;transition:all .2s;background:white}
  .upload-zone:hover{border-color:var(--sky);background:rgba(21,133,181,.03)}
  .upload-icon{font-size:1.8rem;margin-bottom:.6rem}
  .upload-label{font-size:.88rem;color:var(--mid)}
  .upload-label strong{color:var(--sky)}
  .welcome{background:linear-gradient(135deg,var(--ocean) 0%,#0F5276 60%,#1585B5 100%);border-radius:var(--radius);padding:1.5rem;display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;box-shadow:var(--shadow-lg);position:relative;overflow:hidden;gap:1rem;flex-wrap:wrap}
  .welcome::before{content:'';position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.06) 0%,transparent 70%);right:-50px;top:-70px}
  .welcome-text{position:relative;z-index:1}
  .welcome-greeting{font-size:.78rem;color:rgba(255,255,255,.55);margin-bottom:.25rem;font-weight:500}
  .welcome-name{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:700;color:white;letter-spacing:-.02em;margin-bottom:.25rem}
  @media(max-width:480px){.welcome-name{font-size:1.2rem}}
  .welcome-sub{font-size:.82rem;color:rgba(255,255,255,.6)}
  .progress-wrap{background:#E4EEF3;border-radius:20px;height:6px;overflow:hidden}
  .progress-fill{height:100%;border-radius:20px;background:var(--sky);transition:width .4s}
  .divider{height:1px;background:#E4EEF3;margin:1.1rem 0}
  .text-mid{color:var(--mid)}.text-ocean{color:var(--ocean)}.text-coral{color:var(--coral)}.text-success{color:var(--success)}.text-sm{font-size:.82rem}.text-xs{font-size:.72rem}.font-serif{font-family:'Fraunces',serif}.fw-600{font-weight:600}.mt-1{margin-top:.5rem}.mt-2{margin-top:1rem}.mb-1{margin-bottom:.5rem}.mb-2{margin-bottom:1rem}.flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-1{gap:.5rem}.gap-2{gap:1rem}
  .page-enter{animation:fadeUp .25s ease}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
`;
const PACKAGES=[{id:1,name:"Nike Air Max 270",tracking:"1Z999AA10123456784",carrier:"FedEx",status:"cleared",value:"$189",duty:"$34.50",eta:"Ready"},{id:2,name:"Apple MacBook Pro 14\"",tracking:"1Z999AA10123456785",carrier:"UPS",status:"transit",value:"$1,999",duty:"~$380",eta:"Mar 29"},{id:3,name:"ZARA — Summer (3 items)",tracking:"JD014600004632947",carrier:"DHL",status:"pending",value:"$247",duty:"~$47",eta:"Mar 31"},{id:4,name:"Dyson V15 Vacuum",tracking:"1Z999AA10123456780",carrier:"UPS",status:"delivered",value:"$749",duty:"$142",eta:"Mar 21"},{id:5,name:"Samsung 65\" QLED TV",tracking:"9400111899225290",carrier:"USPS",status:"delivered",value:"$1,299",duty:"$247",eta:"Mar 15"}];
const STATUS={transit:{label:"In Transit",cls:"badge-transit"},cleared:{label:"Cleared",cls:"badge-cleared"},delivered:{label:"Delivered",cls:"badge-delivered"},pending:{label:"Awaiting",cls:"badge-pending"}};
const RATES=[{label:"Electronics (35%)",rate:.35},{label:"Clothing & Footwear (45%)",rate:.45},{label:"Books & Educational (10%)",rate:.10},{label:"Furniture & Home (35%)",rate:.35},{label:"Toys & Games (25%)",rate:.25},{label:"Alcohol & Tobacco (50%)",rate:.50},{label:"Sporting Goods (25%)",rate:.25},{label:"Cosmetics (35%)",rate:.35}];
const PLANS=[{id:"basic",name:"Basic",price:29,desc:"For light shoppers",pkgs:5,features:["5 packages/month","Standard delivery","Email alerts","Duty calculator"]},{id:"standard",name:"Standard",price:79,desc:"Most popular",pkgs:15,features:["15 packages/month","Priority clearance","WhatsApp alerts","Scheduled delivery","Document storage"],current:true},{id:"family",name:"Family",price:129,desc:"For heavy shoppers",pkgs:30,features:["30 packages/month","Express clearance","2 addresses","Priority support","14-day storage"],popular:true}];
function Badge({status}){const s=STATUS[status]||STATUS.pending;return <span className={`badge ${s.cls}`}>{s.label}</span>;}
function Dashboard({onNav}){return(<div className="page-enter"><div className="welcome"><div className="welcome-text"><div className="welcome-greeting">Saturday, March 28 · Good morning</div><div className="welcome-name">👋 Welcome back, Marcus</div><div className="welcome-sub">2 packages arriving · 1 ready for delivery</div></div><button className="btn btn-coral btn-sm" onClick={()=>onNav("packages")}>+ Add Package</button></div><div className="stats-grid">{[{label:"Active Packages",value:"3",sub:"2 transit · 1 cleared",accent:"var(--sky)"},{label:"Delivered This Month",value:"7",sub:"↑ 2 more than last month",accent:"var(--success)"},{label:"Duties Paid",value:"$284",sub:"This billing cycle",accent:"var(--warn)"},{label:"Next Delivery",value:"Tue",sub:"Mar 28 · 10am–2pm",accent:"var(--coral)"}].map((s,i)=>(<div className="stat-card" key={i} style={{"--accent":s.accent}}><div className="stat-label">{s.label}</div><div className="stat-value">{s.value}</div><div className="stat-sub">{s.sub}</div></div>))}</div><div className="address-box"><div><div className="address-label">Your Miami Receiving Address</div><div className="address-text"><span className="address-code">Marcus Johnson — DD-4821</span>3850 NW 79th Ave, Suite 400<br/>Miami, FL 33166, USA</div></div><button className="btn btn-sm" style={{borderColor:"rgba(255,255,255,.25)",color:"white",background:"rgba(255,255,255,.12)",border:"1.5px solid rgba(255,255,255,.25)"}} onClick={()=>{navigator.clipboard?.writeText("3850 NW 79th Ave Suite 400 Miami FL 33166");alert("Address copied!");}}>📋 Copy</button></div><div className="two-col"><div className="card card-pad"><div className="card-title">Recent Activity</div><div className="timeline">{[{dot:"done",title:"Nike Air Max 270 — Cleared",sub:"Ready for delivery · $34.50"},{dot:"active",title:"Apple MacBook Pro 14\"",sub:"In transit · Miami ETA: Mar 29"},{dot:"pending",title:"ZARA — 3 items",sub:"Awaiting arrival · Shipped Mar 25"}].map((t,i)=>(<div className="tl-item" key={i}><div className={`tl-dot tl-dot-${t.dot}`}>{t.dot==="done"?"✓":t.dot==="active"?"→":"○"}</div><div><div className="tl-title">{t.title}</div><div className="tl-time">{t.sub}</div></div></div>))}</div></div><div className="card card-pad"><div className="card-title">Subscription</div><div style={{marginBottom:"1rem"}}><div style={{fontFamily:"'Fraunces',serif",fontSize:"1.2rem",fontWeight:600,color:"var(--ocean)"}}>Standard Plan</div><div className="text-sm text-mid mt-1">$79/month · Renews Apr 1</div></div><div style={{background:"var(--light)",borderRadius:10,padding:"1rem",marginBottom:"1rem"}}><div className="flex justify-between text-sm mb-1"><span className="text-mid">Packages used</span><span className="fw-600">9 / 15</span></div><div className="progress-wrap"><div className="progress-fill" style={{width:"60%"}}/></div></div><button className="btn btn-ghost btn-full" onClick={()=>onNav("subscription")}>Manage Plan →</button></div></div></div>);}
function PackagesView(){const [search,setSearch]=useState("");const [filter,setFilter]=useState("all");const filtered=PACKAGES.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())&&(filter==="all"||p.status===filter));return(<div className="page-enter"><div className="flex gap-1 mb-2" style={{flexWrap:"wrap"}}><input className="form-input" style={{maxWidth:260,flex:"1 1 160px"}} placeholder="🔍 Search..." value={search} onChange={e=>setSearch(e.target.value)}/><select className="form-select" style={{maxWidth:160,flex:"1 1 120px"}} value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All Status</option><option value="transit">In Transit</option><option value="cleared">Cleared</option><option value="delivered">Delivered</option><option value="pending">Awaiting</option></select><button className="btn btn-coral btn-sm" style={{whiteSpace:"nowrap"}}>+ Add</button></div><div className="pkg-list"><div className="pkg-row header"><div>Package</div><div>Status</div><div>Value</div><div>Duty</div><div>ETA</div></div>{filtered.map(p=>(<div className="pkg-row" key={p.id}><div className="pkg-col-name"><div className="pkg-name-text">{p.name}</div><div className="pkg-tracking">{p.tracking} · {p.carrier}</div></div><div className="pkg-col-status"><Badge status={p.status}/></div><div className="pkg-col-value text-sm fw-600">{p.value}</div><div className="pkg-col-duty text-sm" style={{color:p.duty.startsWith("~")?"var(--mid)":"var(--warn)"}}>{p.duty}</div><div className="pkg-col-eta text-sm">{p.eta}</div></div>))}{!filtered.length&&<div className="card card-pad" style={{textAlign:"center",color:"var(--mid)",padding:"2rem"}}>No packages found.</div>}</div></div>);}
function CalcView(){const [val,setVal]=useState(500);const [ship,setShip]=useState(45);const [ri,setRi]=useState(0);const rate=RATES[ri].rate,cif=val+ship,duty=cif*rate,vat=(cif+duty)*.10,proc=25,total=duty+vat+proc,tco=val+ship+total;const fmt=n=>"$"+n.toFixed(2);return(<div className="page-enter"><div className="two-col"><div className="card card-pad"><div className="card-title">Item Details</div><div className="form-group"><label className="form-label">Category</label><select className="form-select" value={ri} onChange={e=>setRi(+e.target.value)}>{RATES.map((r,i)=><option key={i} value={i}>{r.label}</option>)}</select></div><div className="form-group"><label className="form-label">Item Value (USD)</label><input className="form-input" type="number" inputMode="decimal" value={val} onChange={e=>setVal(+e.target.value||0)}/></div><div className="form-group"><label className="form-label">Shipping Cost (USD)</label><input className="form-input" type="number" inputMode="decimal" value={ship} onChange={e=>setShip(+e.target.value||0)}/></div><div className="form-group"><label className="form-label">Country of Origin</label><select className="form-select">{["United States","United Kingdom","China","Canada","Germany"].map(c=><option key={c}>{c}</option>)}</select></div></div><div><div className="calc-result"><div style={{fontFamily:"'Fraunces',serif",fontSize:"1rem",fontWeight:600,marginBottom:".75rem",color:"rgba(255,255,255,.7)"}}>Estimate Breakdown</div>{[["Item Value",fmt(val)],["Shipping",fmt(ship)],["CIF Value",fmt(cif)],[`Import Duty (${(rate*100).toFixed(0)}%)`,fmt(duty)],["VAT (10%)",fmt(vat)],["Processing Fee",fmt(proc)]].map(([l,v])=>(<div className="calc-line" key={l}><span>{l}</span><span className="val">{v}</span></div>))}<div className="calc-total"><span>Total Duties & Fees</span><span>{fmt(total)}</span></div><div className="calc-tco"><div className="calc-tco-label">Total Cost of Ownership</div><div className="calc-tco-val">{fmt(tco)}</div></div></div><div className="card card-pad" style={{marginTop:"1rem"}}><div style={{fontSize:".78rem",color:"var(--mid)",lineHeight:1.5}}>⚠️ Estimate only. Final duties determined by Bahamas Customs & Excise.</div></div></div></div></div>);}
function ScheduleView(){const [sel,setSel]=useState(4);const days=[{name:"Mon",num:23},{name:"Tue",num:24,pkg:true},{name:"Wed",num:25},{name:"Thu",num:26},{name:"Fri",num:27},{name:"Sat",num:28},{name:"Sun",num:29}];return(<div className="page-enter"><div className="card card-pad mb-2"><div className="card-title">April 2026</div><div className="day-grid">{days.map((d,i)=>(<div key={i} className={`day-card${i===sel?" active":""}${d.pkg?" has-pkg":""}`} onClick={()=>setSel(i)}><div className="day-name">{d.name}</div><div className="day-num">{d.num}</div>{d.pkg&&<div className="day-dot"/>}</div>))}</div></div><div className="two-col"><div><div className="card-title mb-1">Available Slots</div>{[{time:"Tuesday, April 1",info:"10:00 AM – 2:00 PM · East Nassau",primary:true},{time:"Thursday, April 3",info:"2:00 PM – 6:00 PM · West Nassau"},{time:"Saturday, April 5",info:"9:00 AM – 1:00 PM · All Areas"}].map((s,i)=>(<div className="slot" key={i}><div><div className="slot-time">{s.time}</div><div className="slot-info">{s.info}</div></div><button className={`btn btn-sm ${s.primary?"btn-coral":"btn-ghost"}`}>{s.primary?"Book Now":"Select"}</button></div>))}</div><div className="card card-pad"><div className="card-title">Delivery Address</div><div style={{marginBottom:"1rem"}}><div style={{fontWeight:600,marginBottom:".25rem"}}>Home — Nassau</div><div className="text-sm text-mid">14 Coral Harbour Rd, Nassau</div></div><div className="form-group"><label className="form-label">Instructions</label><textarea className="form-textarea" placeholder="Gate code, landmark..."/></div><button className="btn btn-ghost btn-full">Update Address</button></div></div></div>);}
function DocumentsView(){const docs=[{icon:"🪪",name:"Government ID",meta:"Passport · Mar 1, 2026",status:"verified"},{icon:"🏠",name:"Proof of Address",meta:"Utility Bill · Mar 1, 2026",status:"verified"},{icon:"📋",name:"Commercial Invoice",meta:"MacBook · Mar 24",status:"pending"},{icon:"📦",name:"Packing List",meta:"ZARA · Not uploaded",status:"required"}];return(<div className="page-enter"><div className="doc-grid">{docs.map((d,i)=>(<div className="doc-card" key={i}><div className="doc-icon">{d.icon}</div><div style={{flex:1,minWidth:0}}><div className="doc-name">{d.name}</div><div className="doc-meta">{d.meta}</div></div><span className={`badge ${d.status==="verified"?"badge-cleared":d.status==="pending"?"badge-transit":"badge-pending"}`} style={{marginLeft:"auto",flexShrink:0}}>{d.status==="verified"?"Verified":d.status==="pending"?"Pending":"Required"}</span></div>))}</div><div className="upload-zone mb-2" onClick={()=>alert("Connect to Supabase Storage in Step 3!")}><div className="upload-icon">☁️</div><div className="upload-label"><strong>Tap to upload</strong> or drag and drop</div><div className="upload-label" style={{marginTop:".3rem",fontSize:".75rem"}}>PDF, JPG, PNG · Max 10MB</div></div><div className="card card-pad"><div className="card-title">Clearance Documents</div>{[{ref:"BS-2026-00419",desc:"Nike Air Max",date:"Mar 26",duty:"$34.50"},{ref:"BS-2026-00388",desc:"Dyson V15",date:"Mar 20",duty:"$142.31"}].map((e,i,a)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:".85rem 0",borderBottom:i<a.length-1?"1px solid #E4EEF3":"none",gap:".75rem"}}><div style={{minWidth:0}}><div className="fw-600 text-sm">Entry #{e.ref} — {e.desc}</div><div className="text-xs text-mid">Cleared {e.date} · Duty {e.duty}</div></div><button className="btn btn-ghost btn-sm" style={{flexShrink:0}}>Download</button></div>))}</div></div>);}
function SubscriptionView(){return(<div className="page-enter"><div className="plan-grid">{PLANS.map(p=>(<div key={p.id} className={`plan-card${p.current?" current":""}${p.popular?" popular":""}`}>{p.current&&<div className="plan-pill plan-pill-current">Current Plan</div>}{p.popular&&<div className="plan-pill plan-pill-popular">Best Value</div>}<div className="plan-name">{p.name}</div><div className="text-sm text-mid">{p.desc}</div><div className="plan-price">${p.price}<span>/mo</span></div><ul className="plan-features">{p.features.map((f,i)=><li key={i}>{f}</li>)}</ul><button className={`btn btn-full ${p.current?"btn-ghost":"btn-coral"}`} style={p.current?{opacity:.6,cursor:"default"}:{}}>{p.current?"Current Plan":"Upgrade →"}</button></div>))}</div><div className="card card-pad"><div className="flex justify-between items-center" style={{flexWrap:"wrap",gap:"1rem"}}><div><div className="fw-600">Standard Plan — $79/month</div><div className="text-sm text-mid mt-1">Next charge: April 1, 2026 · Visa ending 4242</div></div><div className="flex gap-1" style={{flexWrap:"wrap"}}><button className="btn btn-ghost btn-sm">Update Payment</button><button className="btn btn-ghost btn-sm text-coral">Cancel</button></div></div></div></div>);}
function AuthScreen({onAuth}){const [mode,setMode]=useState("login");const [form,setForm]=useState({email:"",password:"",name:"",address:""});const upd=(k,v)=>setForm(f=>({...f,[k]:v}));const submit=()=>{if(!form.email||!form.password){alert("Please fill in all fields.");return;}onAuth({name:form.name||"Marcus Johnson",email:form.email});};return(<div className="auth-screen"><div className="auth-left"><div><div className="auth-brand-logo"><div className="auth-brand-icon">📦</div><div className="auth-brand-name">DockDrop</div></div><div className="auth-headline">Shop anywhere.<br/><em>Delivered</em> to your door in Nassau.</div><div className="auth-sub">Your personal Miami address, automatic customs clearance, and 48-hour home delivery — all in one subscription.</div></div><div className="auth-features">{["Personal US shipping address","Automatic customs clearance","Upfront duty estimates","Scheduled Nassau home delivery"].map((f,i)=>(<div className="auth-feature" key={i}><div className="auth-feature-dot"/>{f}</div>))}</div></div><div className="auth-right"><div className="auth-form-wrap"><div className="auth-mobile-logo"><div className="auth-mobile-icon">📦</div><div className="auth-mobile-name">DockDrop</div></div><div className="auth-form-title">{mode==="login"?"Welcome back":"Create account"}</div><div className="auth-form-sub">{mode==="login"?"Sign in to your DockDrop account":"Start receiving packages in Nassau today"}</div>{mode==="signup"&&<div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="Marcus Johnson" value={form.name} onChange={e=>upd("name",e.target.value)}/></div>}<div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" inputMode="email" placeholder="you@example.com" value={form.email} onChange={e=>upd("email",e.target.value)}/></div><div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e=>upd("password",e.target.value)}/></div>{mode==="signup"&&<div className="form-group"><label className="form-label">Nassau Delivery Address</label><input className="form-input" placeholder="14 Coral Harbour Rd, Nassau" value={form.address} onChange={e=>upd("address",e.target.value)}/></div>}<button className="btn btn-coral btn-full" style={{marginTop:".5rem",padding:".9rem"}} onClick={submit}>{mode==="login"?"Sign In →":"Create Account →"}</button>{mode==="login"&&<button className="btn btn-ghost btn-full" style={{marginTop:".75rem"}} onClick={submit}>Continue as Demo User</button>}<div className="auth-toggle">{mode==="login"?<>Don't have an account? <button onClick={()=>setMode("signup")}>Sign up free</button></>:<>Already have an account? <button onClick={()=>setMode("login")}>Sign in</button></>}</div></div></div></div>);}
const NAV=[{id:"dashboard",icon:"🏠",label:"Home",section:"Main"},{id:"packages",icon:"📦",label:"Packages",section:"Main",badge:"3"},{id:"calculator",icon:"🧮",label:"Calculator",section:"Main"},{id:"schedule",icon:"📅",label:"Schedule",section:"Delivery"},{id:"documents",icon:"📄",label:"Documents",section:"Delivery"},{id:"subscription",icon:"⭐",label:"Plan",section:"Account"}];
const TITLES={dashboard:"Dashboard",packages:"My Packages",calculator:"Duty Calculator",schedule:"Delivery Schedule",documents:"Documents",subscription:"Subscription"};
const BOTTOM_NAV=["dashboard","packages","calculator","schedule","subscription"];
export default function App(){
  const [user,setUser]=useState(null);
  const [page,setPage]=useState("dashboard");
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const navigate=(id)=>{setPage(id);setSidebarOpen(false);};
  const sections=[...new Set(NAV.map(n=>n.section))];
  const renderPage=()=>{switch(page){case "dashboard":return <Dashboard onNav={navigate}/>;case "packages":return <PackagesView/>;case "calculator":return <CalcView/>;case "schedule":return <ScheduleView/>;case "documents":return <DocumentsView/>;case "subscription":return <SubscriptionView/>;default:return <Dashboard onNav={navigate}/>;}};
  if(!user)return <><style>{css}</style><AuthScreen onAuth={setUser}/></>;
  const initials=user.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return(
    <>
      <style>{css}</style>
      <div className="app">
        <div className={`sidebar-overlay${sidebarOpen?" show":""}`} onClick={()=>setSidebarOpen(false)}/>
        <aside className={`sidebar${sidebarOpen?" open":""}`}>
          <div className="sidebar-logo"><div className="sidebar-logo-icon">📦</div><div className="sidebar-logo-text">DockDrop</div></div>
          {sections.map(sec=>(<div key={sec}><div className="sidebar-section">{sec}</div>{NAV.filter(n=>n.section===sec).map(n=>(<button key={n.id} className={`sidebar-item${page===n.id?" active":""}`} onClick={()=>navigate(n.id)}><span className="sidebar-icon">{n.icon}</span>{n.label}{n.badge&&<span className="sidebar-badge">{n.badge}</span>}</button>))}</div>))}
          <div style={{marginTop:"1rem"}}><div className="sidebar-section">Account</div><button className="sidebar-item"><span className="sidebar-icon">⚙️</span>Settings</button><button className="sidebar-item" onClick={()=>setUser(null)}><span className="sidebar-icon">↩</span>Sign Out</button></div>
          <div className="sidebar-user"><div className="sidebar-avatar">{initials}</div><div><div className="sidebar-user-name">{user.name}</div><div className="sidebar-user-plan">Standard · DD-4821</div></div></div>
        </aside>
        <div className="main">
          <div className="topbar">
            <div className="topbar-left"><button className="menu-btn" onClick={()=>setSidebarOpen(o=>!o)}>☰</button><div className="topbar-title">{TITLES[page]}</div></div>
            <div className="topbar-right"><button className="notif-btn">🔔<div className="notif-dot"/></button></div>
          </div>
          <div className="content">{renderPage()}</div>
        </div>
        <nav className="bottom-nav">
          <div className="bottom-nav-items">
            {BOTTOM_NAV.map(id=>{const n=NAV.find(x=>x.id===id);if(!n)return null;return(<button key={id} className={`bottom-nav-item${page===id?" active":""}`} onClick={()=>navigate(id)}><div className="bottom-nav-icon">{n.icon}{n.badge&&<span className="bottom-nav-badge">{n.badge}</span>}</div><div className="bottom-nav-label">{n.label}</div></button>);})}
          </div>
        </nav>
      </div>
    </>
  );
}
