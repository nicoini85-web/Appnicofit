/**
 * Base de datos de ejercicios de Appnicofit.
 * Cada ejercicio del "Diccionario de Ejercicios" está mapeado con su imagen
 * de entrenamiento proveniente de wger.de (CC BY-SA licencia).
 *
 * Campos:
 *   id          - identificador único interno
 *   nombre      - nombre en español (según la guía)
 *   grupo       - grupo muscular principal
 *   imgUrl      - URL de la imagen/GIF de demostración
 *   equipamiento - equipamiento principal
 *   musculos    - músculos trabajados
 */

const BASE = 'https://wger.de/media/exercise-images'

export const EJERCICIOS = [
  // ─── PECHO ───────────────────────────────────────────────────────────────────
  { id: 'pecho-01', nombre: 'Press Bco plano c/barra',       grupo: 'Pecho',    equipamiento: 'Barra',         musculos: ['Pectorales', 'Tríceps'],        imgUrl: `${BASE}/192/Bench-press-1.png` },
  { id: 'pecho-02', nombre: 'Press Plano c/manc',            grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectorales', 'Tríceps'],        imgUrl: `${BASE}/97/Dumbbell-bench-press-1.png` },
  { id: 'pecho-03', nombre: 'Press Bco 45° c/barra',         grupo: 'Pecho',    equipamiento: 'Barra',         musculos: ['Pectoral alto', 'Tríceps'],     imgUrl: `${BASE}/41/Incline-bench-press-1.png` },
  { id: 'pecho-04', nombre: 'Press Bco 45° c/manc',          grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectoral alto', 'Tríceps'],     imgUrl: `${BASE}/16/Incline-press-1.png` },
  { id: 'pecho-05', nombre: 'Press Bco dec. c/barra',        grupo: 'Pecho',    equipamiento: 'Barra',         musculos: ['Pectoral bajo', 'Tríceps'],    imgUrl: `${BASE}/100/Decline-bench-press-1.png` },
  { id: 'pecho-06', nombre: 'Press Hammer pecho',            grupo: 'Pecho',    equipamiento: 'Máquina',       musculos: ['Pectorales', 'Deltoides'],     imgUrl: `${BASE}/1655/b263c968-e067-4750-916a-d8758a7df23e.webp` },
  { id: 'pecho-07', nombre: 'Press inclinado converg.',      grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectoral alto'],                imgUrl: `${BASE}/1276/8900b22a-98b1-4cb7-975a-ed506c2d9a7c.png` },
  { id: 'pecho-08', nombre: 'Apertura banco plano',          grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectorales'],                   imgUrl: `${BASE}/238/2fc242d3-5bdd-4f97-99bd-678adb8c96fc.png` },
  { id: 'pecho-09', nombre: 'Apertura banco 45°',            grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectoral alto'],                imgUrl: `${BASE}/1277/9f3c7817-3e3d-417d-8b08-2c0a1aa5fe03.jpg` },
  { id: 'pecho-10', nombre: 'Apertura banco declinado',      grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectoral bajo'],               imgUrl: `${BASE}/97/Dumbbell-bench-press-1.png` },
  { id: 'pecho-11', nombre: 'Cruces en polea',               grupo: 'Pecho',    equipamiento: 'Polea',         musculos: ['Pectorales'],                   imgUrl: `${BASE}/71/Cable-crossover-2.png` },
  { id: 'pecho-12', nombre: 'Cruce en polea P/bajo',         grupo: 'Pecho',    equipamiento: 'Polea',         musculos: ['Pectoral alto'],                imgUrl: `${BASE}/1296/c42782fe-337a-44f4-9079-7f6dedab4885.png` },
  { id: 'pecho-13', nombre: 'Cruce en polea P/superior',     grupo: 'Pecho',    equipamiento: 'Polea',         musculos: ['Pectoral bajo'],               imgUrl: `${BASE}/122/Incline-cable-flyes-1.png` },
  { id: 'pecho-14', nombre: 'Máquina pectoral',              grupo: 'Pecho',    equipamiento: 'Máquina',       musculos: ['Pectorales'],                   imgUrl: `${BASE}/98/Butterfly-machine-2.png` },
  { id: 'pecho-15', nombre: 'Fondos paralelas',              grupo: 'Pecho',    equipamiento: 'Peso corporal', musculos: ['Pectorales', 'Tríceps'],        imgUrl: `${BASE}/194/34600351-8b0b-4cb0-8daa-583537be15b0.png` },
  { id: 'pecho-16', nombre: 'Pull overt plano',              grupo: 'Pecho',    equipamiento: 'Mancuernas',    musculos: ['Pectorales', 'Dorsales'],       imgUrl: `${BASE}/238/2fc242d3-5bdd-4f97-99bd-678adb8c96fc.png` },
  { id: 'pecho-17', nombre: 'Pull overt cruzado',            grupo: 'Pecho',    equipamiento: 'Polea',         musculos: ['Pectorales'],                   imgUrl: `${BASE}/122/Incline-cable-flyes-1.png` },
  { id: 'pecho-18', nombre: 'Flexiones',                     grupo: 'Pecho',    equipamiento: 'Peso corporal', musculos: ['Pectorales', 'Tríceps'],        imgUrl: `${BASE}/1551/a6a9e561-3965-45c6-9f2b-ee671e1a3a45.png` },
  { id: 'pecho-19', nombre: 'Flexiones con steps',           grupo: 'Pecho',    equipamiento: 'Peso corporal', musculos: ['Pectoral alto', 'Tríceps'],    imgUrl: `${BASE}/1112/81f40bee-4adf-4317-8476-1a87706e3031.png` },
  { id: 'pecho-20', nombre: 'Vuelta al mundo',               grupo: 'Pecho',    equipamiento: 'Polea',         musculos: ['Pectorales'],                   imgUrl: `${BASE}/71/Cable-crossover-2.png` },

  // ─── ESPALDA ─────────────────────────────────────────────────────────────────
  { id: 'esp-01', nombre: 'Dominadas atrás',               grupo: 'Espalda',  equipamiento: 'Peso corporal', musculos: ['Dorsales', 'Bíceps'],            imgUrl: `${BASE}/475/b0554016-16fd-4dbe-be47-a2a17d16ae0e.jpg` },
  { id: 'esp-02', nombre: 'Dominadas adelante',            grupo: 'Espalda',  equipamiento: 'Peso corporal', musculos: ['Dorsales', 'Bíceps'],            imgUrl: `${BASE}/181/Chin-ups-2.png` },
  { id: 'esp-03', nombre: 'Dominadas c/triang',            grupo: 'Espalda',  equipamiento: 'Peso corporal', musculos: ['Dorsales'],                      imgUrl: `${BASE}/158/02e8a7c3-dc67-434e-a4bc-77fdecf84b49.webp` },
  { id: 'esp-04', nombre: 'Polea alta tras nuca',          grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsales', 'Bíceps'],            imgUrl: `${BASE}/158/02e8a7c3-dc67-434e-a4bc-77fdecf84b49.webp` },
  { id: 'esp-05', nombre: 'Polea alta adelante',           grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsales'],                      imgUrl: `${BASE}/1635/b8c34e3a-7474-41ea-99e3-8d7fdb1e12d6.png` },
  { id: 'esp-06', nombre: 'Polea alta rotativa 1 brazo',   grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsal', 'Bíceps'],              imgUrl: `${BASE}/1636/1bf3ee54-207c-4b53-b057-15adc1dd6128.png` },
  { id: 'esp-07', nombre: 'Remo Polea alta c/triang',      grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsales', 'Romboides'],         imgUrl: `${BASE}/921/2555c4c3-a84d-47db-b83b-cbf721f12e45.png` },
  { id: 'esp-08', nombre: 'Polea baja (recta)',            grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsales'],                      imgUrl: `${BASE}/143/Cable-seated-rows-2.png` },
  { id: 'esp-09', nombre: 'Remo Polea baja c/triang',      grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Romboides', 'Dorsales'],         imgUrl: `${BASE}/1117/e74255c0-67a0-4309-b78d-2d79e6ff8c11.png` },
  { id: 'esp-10', nombre: 'Remo Polea baja 1 brazo',       grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsal', 'Romboides'],           imgUrl: `${BASE}/1637/a1fbe83a-a3e5-49f6-a2c2-5d5b533c2be8.png` },
  { id: 'esp-11', nombre: 'Remo 90° barra',                grupo: 'Espalda',  equipamiento: 'Barra',         musculos: ['Dorsales', 'Romboides'],         imgUrl: `${BASE}/109/Barbell-rear-delt-row-1.png` },
  { id: 'esp-12', nombre: 'Remo 90° mancuernas',           grupo: 'Espalda',  equipamiento: 'Mancuernas',    musculos: ['Dorsales', 'Romboides'],         imgUrl: `${BASE}/81/a751a438-ae2d-4751-8d61-cef0e9292174.png` },
  { id: 'esp-13', nombre: 'Remo con apoyo',                grupo: 'Espalda',  equipamiento: 'Mancuernas',    musculos: ['Dorsales', 'Romboides'],         imgUrl: `${BASE}/1283/e7262f70-7512-408a-8d00-4c499ef632fc.jpg` },
  { id: 'esp-14', nombre: 'Remo serrucho c/cable',         grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsal', 'Trapecios'],           imgUrl: `${BASE}/1636/1bf3ee54-207c-4b53-b057-15adc1dd6128.png` },
  { id: 'esp-15', nombre: 'Remo serrucho c/manc',          grupo: 'Espalda',  equipamiento: 'Mancuernas',    musculos: ['Dorsal', 'Romboides'],           imgUrl: `${BASE}/1186/1987a039-cf35-437e-bbdc-40c53dd7d053.jpg` },
  { id: 'esp-16', nombre: 'Remo hammer',                   grupo: 'Espalda',  equipamiento: 'Máquina',       musculos: ['Dorsales', 'Bíceps'],            imgUrl: `${BASE}/106/T-bar-row-1.png` },
  { id: 'esp-17', nombre: 'Despegues',                     grupo: 'Espalda',  equipamiento: 'Barra',         musculos: ['Espalda baja', 'Glúteos'],       imgUrl: `${BASE}/184/1709c405-620a-4d07-9658-fade2b66a2df.jpeg` },
  { id: 'esp-18', nombre: 'Arranques',                     grupo: 'Espalda',  equipamiento: 'Barra',         musculos: ['Espalda completa', 'Piernas'],   imgUrl: `${BASE}/1187/cd16b706-b9d2-47a7-81cf-a27724017d89.jpg` },
  { id: 'esp-19', nombre: 'Cargada de potencia',           grupo: 'Espalda',  equipamiento: 'Mancuernas',    musculos: ['Espalda completa', 'Hombros'],   imgUrl: `${BASE}/1087/d85f4e02-b20c-457c-bdfb-0b00e2d14150.jpg` },
  { id: 'esp-20', nombre: 'Buenos días',                   grupo: 'Espalda',  equipamiento: 'Barra',         musculos: ['Lumbar', 'Isquiotibiales'],      imgUrl: `${BASE}/116/Good-mornings-2.png` },
  { id: 'esp-21', nombre: 'Hiper extensiones',             grupo: 'Espalda',  equipamiento: 'Máquina',       musculos: ['Lumbar', 'Glúteos'],             imgUrl: `${BASE}/128/Hyperextensions-1.png` },
  { id: 'esp-22', nombre: 'Pull overt Disco',              grupo: 'Espalda',  equipamiento: 'Disco',         musculos: ['Dorsales', 'Pectorales'],        imgUrl: `${BASE}/1634/9a4704d3-1b25-43e3-b244-3885f4d3db87.png` },
  { id: 'esp-23', nombre: 'Pull overt Barra',              grupo: 'Espalda',  equipamiento: 'Barra',         musculos: ['Dorsales', 'Pectorales'],        imgUrl: `${BASE}/1634/9a4704d3-1b25-43e3-b244-3885f4d3db87.png` },
  { id: 'esp-24', nombre: 'Pull overt Polea',              grupo: 'Espalda',  equipamiento: 'Polea',         musculos: ['Dorsales'],                      imgUrl: `${BASE}/1726/2e7e541b-5f55-405a-ae78-3e71b3f42db4.png` },

  // ─── TRÍCEPS ─────────────────────────────────────────────────────────────────
  { id: 'tri-01', nombre: 'Triceps de fuerza',             grupo: 'Tríceps',  equipamiento: 'Barra',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/88/Narrow-grip-bench-press-1.png` },
  { id: 'tri-02', nombre: 'Triceps a la frente',           grupo: 'Tríceps',  equipamiento: 'Barra EZ',      musculos: ['Tríceps'],                       imgUrl: `${BASE}/84/Lying-close-grip-triceps-press-to-chin-1.png` },
  { id: 'tri-03', nombre: 'Triceps a la frente barra',     grupo: 'Tríceps',  equipamiento: 'Barra',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/1297/a2f17a04-5523-4aa3-bce3-6b284807c126.png` },
  { id: 'tri-04', nombre: 'Triceps a la frente manc',      grupo: 'Tríceps',  equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                       imgUrl: `${BASE}/1749/7510c8e5-b39f-4f0e-803c-c46f6357e267.png` },
  { id: 'tri-05', nombre: 'Polea parado (tirones)',         grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/659/a60452f1-e2ea-43fe-baa6-c1a2208d060c.png` },
  { id: 'tri-06', nombre: 'Polea parado agarre en V',      grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/1185/c5ca283d-8958-4fd8-9d59-a3f52a3ac66b.jpg` },
  { id: 'tri-07', nombre: 'Polea concentrado',             grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/1298/ec4b83ec-5a8f-4303-9050-99ec4389bc2a.png` },
  { id: 'tri-08', nombre: 'Máquina de triceps',            grupo: 'Tríceps',  equipamiento: 'Máquina',       musculos: ['Tríceps'],                       imgUrl: `${BASE}/659/a60452f1-e2ea-43fe-baa6-c1a2208d060c.png` },
  { id: 'tri-09', nombre: 'Triceps francés c/barra',       grupo: 'Tríceps',  equipamiento: 'Barra',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/84/Lying-close-grip-triceps-press-to-chin-1.png` },
  { id: 'tri-10', nombre: 'Triceps francés c/manc',        grupo: 'Tríceps',  equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                       imgUrl: `${BASE}/1749/7510c8e5-b39f-4f0e-803c-c46f6357e267.png` },
  { id: 'tri-11', nombre: 'Triceps lagartija',             grupo: 'Tríceps',  equipamiento: 'Peso corporal', musculos: ['Tríceps'],                       imgUrl: `${BASE}/1551/a6a9e561-3965-45c6-9f2b-ee671e1a3a45.png` },
  { id: 'tri-12', nombre: 'Fondos paralelas',              grupo: 'Tríceps',  equipamiento: 'Peso corporal', musculos: ['Tríceps', 'Pectorales'],         imgUrl: `${BASE}/194/34600351-8b0b-4cb0-8daa-583537be15b0.png` },
  { id: 'tri-13', nombre: 'Fondos en el banco',            grupo: 'Tríceps',  equipamiento: 'Banco',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/83/Bench-dips-1.png` },
  { id: 'tri-14', nombre: 'Patada de burro polea',         grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/1900/a8243245-8f8f-4e2b-93ca-694d416cb11d.png` },
  { id: 'tri-15', nombre: 'Patada de burro manc',          grupo: 'Tríceps',  equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                       imgUrl: `${BASE}/1336/ebf88217-df26-4ef7-94cb-f0c2220c6abe.webp` },
  { id: 'tri-16', nombre: 'Polea parado lateral',          grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/1298/ec4b83ec-5a8f-4303-9050-99ec4389bc2a.png` },
  { id: 'tri-17', nombre: 'Polea katana',                  grupo: 'Tríceps',  equipamiento: 'Polea',         musculos: ['Tríceps'],                       imgUrl: `${BASE}/659/a60452f1-e2ea-43fe-baa6-c1a2208d060c.png` },
  { id: 'tri-18', nombre: 'Katana mancuerna',              grupo: 'Tríceps',  equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                       imgUrl: `${BASE}/1749/7510c8e5-b39f-4f0e-803c-c46f6357e267.png` },

  // ─── HOMBROS ─────────────────────────────────────────────────────────────────
  { id: 'hom-01', nombre: 'Press rotativa',                grupo: 'Hombros',  equipamiento: 'Máquina',       musculos: ['Deltoides'],                     imgUrl: `${BASE}/53/Shoulder-press-machine-2.png` },
  { id: 'hom-02', nombre: 'Press tras nuca',               grupo: 'Hombros',  equipamiento: 'Barra',         musculos: ['Deltoides posterior'],           imgUrl: `${BASE}/119/seated-barbell-shoulder-press-large-1.png` },
  { id: 'hom-03', nombre: 'Press militar',                 grupo: 'Hombros',  equipamiento: 'Barra',         musculos: ['Deltoides', 'Trapecios'],        imgUrl: `${BASE}/418/fa2a2207-43cb-4dc0-bc2a-039e32544790.png` },
  { id: 'hom-04', nombre: 'Press hammer neutro',           grupo: 'Hombros',  equipamiento: 'Máquina',       musculos: ['Deltoides'],                     imgUrl: `${BASE}/53/Shoulder-press-machine-2.png` },
  { id: 'hom-05', nombre: 'Press hammer lateral',          grupo: 'Hombros',  equipamiento: 'Máquina',       musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/53/Shoulder-press-machine-2.png` },
  { id: 'hom-06', nombre: 'Press c/mancuerna',             grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides'],                     imgUrl: `${BASE}/123/dumbbell-shoulder-press-large-1.png` },
  { id: 'hom-07', nombre: 'Press c/manc 1 brazo',          grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides'],                     imgUrl: `${BASE}/1338/9d157b4d-5af0-43c1-bd34-f52144ba1b54.webp` },
  { id: 'hom-08', nombre: 'Lateral en polea',              grupo: 'Hombros',  equipamiento: 'Polea',         musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/1378/7c1fcf34-fb7e-45e7-a0c1-51f296235315.jpg` },
  { id: 'hom-09', nombre: 'Vuelo lateral mancuerna',       grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/148/lateral-dumbbell-raises-large-2.png` },
  { id: 'hom-10', nombre: 'Vuelo lateral máquina',         grupo: 'Hombros',  equipamiento: 'Máquina',       musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/1744/cb9263c4-39fc-4261-8d30-a5d6d57841c1.jpg` },
  { id: 'hom-11', nombre: 'Vuelo lateral bco 90°',         grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/148/lateral-dumbbell-raises-large-2.png` },
  { id: 'hom-12', nombre: 'Vuelo lateral bco 45°',         grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],             imgUrl: `${BASE}/1338/9d157b4d-5af0-43c1-bd34-f52144ba1b54.webp` },
  { id: 'hom-13', nombre: 'Vuelo frontal',                 grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides anterior'],            imgUrl: `${BASE}/256/b7def5bc-2352-499b-b9e5-fff741003831.png` },
  { id: 'hom-14', nombre: 'Vuelo posterior cruzado',       grupo: 'Hombros',  equipamiento: 'Polea',         musculos: ['Deltoides posterior'],           imgUrl: `${BASE}/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png` },
  { id: 'hom-15', nombre: 'Vuelo posterior mancuerna',     grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Deltoides posterior'],           imgUrl: `${BASE}/829/ad724e5c-b1ed-49e8-9279-a17545b0dd0b.png` },
  { id: 'hom-16', nombre: 'Posterior en polea',            grupo: 'Hombros',  equipamiento: 'Polea',         musculos: ['Deltoides posterior'],           imgUrl: `${BASE}/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png` },
  { id: 'hom-17', nombre: 'Posterior c/barra',             grupo: 'Hombros',  equipamiento: 'Barra',         musculos: ['Deltoides posterior', 'Trapecios'], imgUrl: `${BASE}/109/Barbell-rear-delt-row-1.png` },
  { id: 'hom-18', nombre: 'Posterior c/soga polea',        grupo: 'Hombros',  equipamiento: 'Polea',         musculos: ['Deltoides posterior'],           imgUrl: `${BASE}/822/74affc0d-03b6-4f33-b5f4-a822a2615f68.png` },
  { id: 'hom-19', nombre: 'Frontal mas Explosivo',         grupo: 'Hombros',  equipamiento: 'Barra',         musculos: ['Deltoides anterior', 'Trapecios'], imgUrl: `${BASE}/478/70a2d72c-a822-45f3-8de2-54ea85951b84.jpg` },
  { id: 'hom-20', nombre: 'Remo de pie',                   grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Trapecios', 'Deltoides'],        imgUrl: `${BASE}/694/119e6823-6960-4341-a9e1-aaf78d7fb57c.png` },
  { id: 'hom-21', nombre: 'Trapecio c/manc',               grupo: 'Hombros',  equipamiento: 'Mancuernas',    musculos: ['Trapecios'],                     imgUrl: `${BASE}/151/Dumbbell-shrugs-2.png` },
  { id: 'hom-22', nombre: 'Trapecio c/barra',              grupo: 'Hombros',  equipamiento: 'Barra',         musculos: ['Trapecios'],                     imgUrl: `${BASE}/150/Barbell-shrugs-1.png` },
  { id: 'hom-23', nombre: 'Trapecio c/barra polea',        grupo: 'Hombros',  equipamiento: 'Polea',         musculos: ['Trapecios'],                     imgUrl: `${BASE}/694/119e6823-6960-4341-a9e1-aaf78d7fb57c.png` },

  // ─── BÍCEPS ──────────────────────────────────────────────────────────────────
  { id: 'bic-01', nombre: 'Biceps barra',                  grupo: 'Bíceps',   equipamiento: 'Barra',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/74/Bicep-curls-1.png` },
  { id: 'bic-02', nombre: 'Biceps banco scott',            grupo: 'Bíceps',   equipamiento: 'Barra',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/193/Preacher-curl-3-1.png` },
  { id: 'bic-03', nombre: 'Biceps máquina',                grupo: 'Bíceps',   equipamiento: 'Máquina',       musculos: ['Bíceps'],                        imgUrl: `${BASE}/193/Preacher-curl-3-1.png` },
  { id: 'bic-04', nombre: 'Biceps c/manc',                 grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/81/Biceps-curl-1.png` },
  { id: 'bic-05', nombre: 'Biceps c/manc scott',           grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/1448/2184e68c-32b5-413f-a7c1-4a2d1bb98c35.png` },
  { id: 'bic-06', nombre: 'Biceps c/manc conc',            grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/1649/441cc0e5-eca2-4828-8b0a-a0e554abb2ff.jpg` },
  { id: 'bic-07', nombre: 'Biceps c/manc alternado',       grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/1192/651a4535-8210-4dbd-8f06-61d95fdd9963.png` },
  { id: 'bic-08', nombre: 'Biceps c/manc Bco 45°',         grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/81/Biceps-curl-1.png` },
  { id: 'bic-09', nombre: 'Biceps c/manc Martillo Bco 45°',grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps', 'Braquial'],            imgUrl: `${BASE}/86/Bicep-hammer-curl-1.png` },
  { id: 'bic-10', nombre: 'Biceps 21 mancuernas',          grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                        imgUrl: `${BASE}/1192/651a4535-8210-4dbd-8f06-61d95fdd9963.png` },
  { id: 'bic-11', nombre: 'Biceps 21 barra / neutro',      grupo: 'Bíceps',   equipamiento: 'Barra',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/74/Bicep-curls-1.png` },
  { id: 'bic-12', nombre: 'Biceps en polea',               grupo: 'Bíceps',   equipamiento: 'Polea',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/129/Standing-biceps-curl-1.png` },
  { id: 'bic-13', nombre: 'Biceps en polea en cruz',       grupo: 'Bíceps',   equipamiento: 'Polea',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/1109/00b0a0bf-c14a-4f13-bb14-62c09030a1aa.png` },
  { id: 'bic-14', nombre: 'Biceps 21 barra',               grupo: 'Bíceps',   equipamiento: 'Barra',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/74/Bicep-curls-1.png` },
  { id: 'bic-15', nombre: 'Biceps conc. c/cable',          grupo: 'Bíceps',   equipamiento: 'Polea',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/1109/00b0a0bf-c14a-4f13-bb14-62c09030a1aa.png` },
  { id: 'bic-16', nombre: 'Biceps martillo',               grupo: 'Bíceps',   equipamiento: 'Mancuernas',    musculos: ['Bíceps', 'Braquial'],            imgUrl: `${BASE}/86/Bicep-hammer-curl-1.png` },
  { id: 'bic-17', nombre: 'Biceps conc. c/barra',          grupo: 'Bíceps',   equipamiento: 'Barra',         musculos: ['Bíceps'],                        imgUrl: `${BASE}/193/Preacher-curl-3-1.png` },

  // ─── PIERNAS ─────────────────────────────────────────────────────────────────
  { id: 'pie-01', nombre: 'Sentadilla máq. Smit',          grupo: 'Piernas',  equipamiento: 'Máquina Smith', musculos: ['Cuádriceps', 'Glúteos'],         imgUrl: `${BASE}/1801/60043328-1cfb-4289-9865-aaf64d5aaa28.jpg` },
  { id: 'pie-02', nombre: 'Sentadilla c/barra',            grupo: 'Piernas',  equipamiento: 'Barra',         musculos: ['Cuádriceps', 'Glúteos'],         imgUrl: `${BASE}/1627/86d0b85a-66b7-4e5f-bf8d-bb4d7eb03f59.webp` },
  { id: 'pie-03', nombre: 'Sentadilla frontal',            grupo: 'Piernas',  equipamiento: 'Barra',         musculos: ['Cuádriceps'],                    imgUrl: `${BASE}/191/Front-squat-1-857x1024.png` },
  { id: 'pie-04', nombre: 'Sentadilla Sysy',               grupo: 'Piernas',  equipamiento: 'Barra',         musculos: ['Cuádriceps', 'Glúteos'],         imgUrl: `${BASE}/1801/60043328-1cfb-4289-9865-aaf64d5aaa28.jpg` },
  { id: 'pie-05', nombre: 'Sentadilla Búlgara',            grupo: 'Piernas',  equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Glúteos'],         imgUrl: `${BASE}/988/6283b258-a4d7-4833-84f7-a38987022d3d.png` },
  { id: 'pie-06', nombre: 'Prensa 45°',                    grupo: 'Piernas',  equipamiento: 'Máquina',       musculos: ['Cuádriceps', 'Glúteos'],         imgUrl: `${BASE}/130/Narrow-stance-hack-squats-1-1024x721.png` },
  { id: 'pie-07', nombre: 'Sillón cuádriceps',             grupo: 'Piernas',  equipamiento: 'Máquina',       musculos: ['Cuádriceps'],                    imgUrl: `${BASE}/369/78c915d1-e46d-4d30-8124-65d68664c3ef.png` },
  { id: 'pie-08', nombre: 'Camilla b. Femoral',            grupo: 'Piernas',  equipamiento: 'Máquina',       musculos: ['Isquiotibiales'],                imgUrl: `${BASE}/154/lying-leg-curl-machine-large-1.png` },
  { id: 'pie-09', nombre: 'Peso muerto 1 pierna',          grupo: 'Piernas',  equipamiento: 'Mancuernas',    musculos: ['Isquiotibiales', 'Glúteos'],     imgUrl: `${BASE}/1736/aa724cc5-c485-4f3e-9d2a-0c6ae4baefbe.png` },
  { id: 'pie-10', nombre: 'Gemelos sentado',               grupo: 'Piernas',  equipamiento: 'Máquina',       musculos: ['Gemelos'],                       imgUrl: `${BASE}/1620/edd40e39-e337-4460-a8dd-6127d40ddd16.jpeg` },
  { id: 'pie-11', nombre: 'Gemelos parado',                grupo: 'Piernas',  equipamiento: 'Peso corporal', musculos: ['Gemelos'],                       imgUrl: `${BASE}/622/9a429bd0-afd3-4ad0-8043-e9beec901c81.jpeg` },

  // ─── GLÚTEOS ─────────────────────────────────────────────────────────────────
  { id: 'glu-01', nombre: 'Hip thrust',                    grupo: 'Glúteos',  equipamiento: 'Barra',         musculos: ['Glúteos'],                       imgUrl: `${BASE}/1614/7f3cfae2-e062-4211-9a6b-5a10851ce7f4.jpg` },
  { id: 'glu-02', nombre: 'Hip thrust 1 pierna',           grupo: 'Glúteos',  equipamiento: 'Barra',         musculos: ['Glúteos'],                       imgUrl: `${BASE}/1642/a81ad922-caf5-47f8-99b4-640cb0717436.webp` },
  { id: 'glu-03', nombre: 'Máquina hip thrust',            grupo: 'Glúteos',  equipamiento: 'Máquina',       musculos: ['Glúteos'],                       imgUrl: `${BASE}/1614/7f3cfae2-e062-4211-9a6b-5a10851ce7f4.jpg` },
  { id: 'glu-04', nombre: 'Estocadas con barra',           grupo: 'Glúteos',  equipamiento: 'Barra',         musculos: ['Glúteos', 'Cuádriceps'],         imgUrl: `${BASE}/1830/3b6c547c-ab3d-4472-93cf-561710279eab.jpg` },
  { id: 'glu-05', nombre: 'Estocadas con manc',            grupo: 'Glúteos',  equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Cuádriceps'],         imgUrl: `${BASE}/113/Walking-lunges-1.png` },
  { id: 'glu-06', nombre: 'Peso muerto rumano',            grupo: 'Glúteos',  equipamiento: 'Barra',         musculos: ['Glúteos', 'Isquiotibiales'],    imgUrl: `${BASE}/1652/0306c8c0-70cc-45d4-92de-6fa72ceaa834.webp` },
  { id: 'glu-07', nombre: 'Patada glúteos cable',          grupo: 'Glúteos',  equipamiento: 'Polea',         musculos: ['Glúteos'],                       imgUrl: `${BASE}/1613/a851fe9d-771f-44da-82f0-799e02ae3fd1.jpg` },
  { id: 'glu-08', nombre: 'Aductores máquina',             grupo: 'Glúteos',  equipamiento: 'Máquina',       musculos: ['Aductores'],                     imgUrl: `${BASE}/12/4a42cc6f-648d-40cc-a72a-c49dd47e1667.webp` },
  { id: 'glu-09', nombre: 'Buenos días en polea',          grupo: 'Glúteos',  equipamiento: 'Polea',         musculos: ['Lumbar', 'Glúteos'],             imgUrl: `${BASE}/116/Good-mornings-2.png` },

  // ─── ABDOMINALES ─────────────────────────────────────────────────────────────
  { id: 'abd-01', nombre: 'Abd. Oblicuos',                 grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Oblicuos'],                   imgUrl: `${BASE}/176/Cross-body-crunch-1.png` },
  { id: 'abd-02', nombre: 'Patada al cielo',               grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales'],               imgUrl: `${BASE}/125/Leg-raises-2.png` },
  { id: 'abd-03', nombre: 'Abd. Banco',                    grupo: 'Abdominales', equipamiento: 'Banco',         musculos: ['Abdominales'],               imgUrl: `${BASE}/56/Decline-crunch-1.png` },
  { id: 'abd-04', nombre: 'Levantamiento de piernas',      grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales bajos'],         imgUrl: `${BASE}/1105/36776818-799a-40bf-9eca-aebb3aa5008f.png` },
  { id: 'abd-05', nombre: 'Encogimiento de piernas',       grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales'],               imgUrl: `${BASE}/91/Crunches-1.png` },
  { id: 'abd-06', nombre: 'Crunches',                      grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Recto abdominal'],           imgUrl: `${BASE}/91/Crunches-1.png` },
  { id: 'abd-07', nombre: 'Plancha frontal',               grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Core', 'Abdominales'],       imgUrl: `${BASE}/458/b7bd9c28-9f1d-4647-bd17-ab6a3adf5770.png` },
  { id: 'abd-08', nombre: 'Plancha lateral',               grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Oblicuos', 'Core'],          imgUrl: `${BASE}/176/Cross-body-crunch-1.png` },
]

export const GRUPOS = [...new Set(EJERCICIOS.map(e => e.grupo))]

export function getByGrupo(grupo) {
  return EJERCICIOS.filter(e => e.grupo === grupo)
}

export function getById(id) {
  return EJERCICIOS.find(e => e.id === id) ?? null
}
