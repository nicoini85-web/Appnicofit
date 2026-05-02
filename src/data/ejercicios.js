/**
 * Base de datos completa de ejercicios — Appnicofit
 * 179 ejercicios con animaciones de 2 frames (simula GIF).
 * Imágenes: github.com/yuhonas/free-exercise-db (MIT license)
 */

const BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

// Returns [frame0, frame1] URLs for a given exercise folder name
function gif(folder) {
  return [`${BASE}/${folder}/0.jpg`, `${BASE}/${folder}/1.jpg`]
}

export const EJERCICIOS = [
  // ─── PECHO (20) ──────────────────────────────────────────────────────────────
  { id: 'pecho-01', nombre: 'Press Bco plano c/barra',        grupo: 'Pecho',      equipamiento: 'Barra',         musculos: ['Pectorales', 'Tríceps'],            frames: gif('Barbell_Bench_Press_-_Medium_Grip') },
  { id: 'pecho-02', nombre: 'Press Plano c/manc',             grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectorales', 'Tríceps'],            frames: gif('Dumbbell_Bench_Press') },
  { id: 'pecho-03', nombre: 'Press Bco 45° c/barra',          grupo: 'Pecho',      equipamiento: 'Barra',         musculos: ['Pectoral alto', 'Tríceps'],         frames: gif('Barbell_Incline_Bench_Press_-_Medium_Grip') },
  { id: 'pecho-04', nombre: 'Press Bco 45° c/manc',           grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectoral alto', 'Tríceps'],         frames: gif('Incline_Dumbbell_Press') },
  { id: 'pecho-05', nombre: 'Press Bco dec. c/barra',         grupo: 'Pecho',      equipamiento: 'Barra',         musculos: ['Pectoral bajo', 'Tríceps'],         frames: gif('Decline_Barbell_Bench_Press') },
  { id: 'pecho-06', nombre: 'Press Hammer pecho',             grupo: 'Pecho',      equipamiento: 'Máquina',       musculos: ['Pectorales', 'Deltoides'],          frames: gif('Machine_Bench_Press') },
  { id: 'pecho-07', nombre: 'Press inclinado converg.',       grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectoral alto'],                    frames: gif('Incline_Dumbbell_Press') },
  { id: 'pecho-08', nombre: 'Apertura banco plano',           grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectorales'],                       frames: gif('Dumbbell_Flyes') },
  { id: 'pecho-09', nombre: 'Apertura banco 45°',             grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectoral alto'],                    frames: gif('Incline_Dumbbell_Flyes') },
  { id: 'pecho-10', nombre: 'Apertura banco declinado',       grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectoral bajo'],                    frames: gif('Decline_Dumbbell_Flyes') },
  { id: 'pecho-11', nombre: 'Cruces en polea',                grupo: 'Pecho',      equipamiento: 'Polea',         musculos: ['Pectorales'],                       frames: gif('Cable_Crossover') },
  { id: 'pecho-12', nombre: 'Cruce en polea P/bajo',          grupo: 'Pecho',      equipamiento: 'Polea',         musculos: ['Pectoral alto'],                    frames: gif('Cable_Crossover') },
  { id: 'pecho-13', nombre: 'Cruce en polea P/superior',      grupo: 'Pecho',      equipamiento: 'Polea',         musculos: ['Pectoral bajo'],                    frames: gif('Cable_Crossover') },
  { id: 'pecho-14', nombre: 'Máquina pectoral',               grupo: 'Pecho',      equipamiento: 'Máquina',       musculos: ['Pectorales'],                       frames: gif('Butterfly') },
  { id: 'pecho-15', nombre: 'Fondos paralelas',               grupo: 'Pecho',      equipamiento: 'Peso corporal', musculos: ['Pectorales', 'Tríceps'],            frames: gif('Dips_-_Chest_Version') },
  { id: 'pecho-16', nombre: 'Pull overt plano',               grupo: 'Pecho',      equipamiento: 'Mancuernas',    musculos: ['Pectorales', 'Dorsales'],           frames: gif('Bent-Arm_Dumbbell_Pullover') },
  { id: 'pecho-17', nombre: 'Pull overt cruzado',             grupo: 'Pecho',      equipamiento: 'Polea',         musculos: ['Pectorales'],                       frames: gif('Straight-Arm_Dumbbell_Pullover') },
  { id: 'pecho-18', nombre: 'Flexiones',                      grupo: 'Pecho',      equipamiento: 'Peso corporal', musculos: ['Pectorales', 'Tríceps'],            frames: gif('Close-Grip_Push-Up_off_of_a_Dumbbell') },
  { id: 'pecho-19', nombre: 'Flexiones con steps',            grupo: 'Pecho',      equipamiento: 'Peso corporal', musculos: ['Pectoral alto', 'Tríceps'],         frames: gif('Decline_Push-Up') },
  { id: 'pecho-20', nombre: 'Vuelta al mundo',                grupo: 'Pecho',      equipamiento: 'Polea',         musculos: ['Pectorales'],                       frames: gif('Cable_Crossover') },

  // ─── ESPALDA (24) ────────────────────────────────────────────────────────────
  { id: 'esp-01', nombre: 'Dominadas atrás',                  grupo: 'Espalda',    equipamiento: 'Peso corporal', musculos: ['Dorsales', 'Bíceps'],               frames: gif('Wide-Grip_Lat_Pulldown') },
  { id: 'esp-02', nombre: 'Dominadas adelante',               grupo: 'Espalda',    equipamiento: 'Peso corporal', musculos: ['Dorsales', 'Bíceps'],               frames: gif('Close-Grip_Front_Lat_Pulldown') },
  { id: 'esp-03', nombre: 'Dominadas c/triang',               grupo: 'Espalda',    equipamiento: 'Peso corporal', musculos: ['Dorsales'],                         frames: gif('Close-Grip_Front_Lat_Pulldown') },
  { id: 'esp-04', nombre: 'Polea alta tras nuca',             grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsales', 'Bíceps'],               frames: gif('Reverse_Grip_Triceps_Pushdown') },
  { id: 'esp-05', nombre: 'Polea alta adelante',              grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsales'],                         frames: gif('Wide-Grip_Lat_Pulldown') },
  { id: 'esp-06', nombre: 'Polea alta rotativa 1 brazo',      grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsal', 'Bíceps'],                 frames: gif('One-Arm_Dumbbell_Row') },
  { id: 'esp-07', nombre: 'Remo Polea alta c/triang',         grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsales', 'Romboides'],            frames: gif('Seated_Cable_Rows') },
  { id: 'esp-08', nombre: 'Polea baja (recta)',               grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsales'],                         frames: gif('Seated_Cable_Rows') },
  { id: 'esp-09', nombre: 'Remo Polea baja c/triang',         grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Romboides', 'Dorsales'],            frames: gif('Seated_Cable_Rows') },
  { id: 'esp-10', nombre: 'Remo Polea baja 1 brazo',          grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsal', 'Romboides'],              frames: gif('One-Arm_Dumbbell_Row') },
  { id: 'esp-11', nombre: 'Remo 90° barra',                   grupo: 'Espalda',    equipamiento: 'Barra',         musculos: ['Dorsales', 'Romboides'],            frames: gif('Bent_Over_Barbell_Row') },
  { id: 'esp-12', nombre: 'Remo 90° mancuernas',              grupo: 'Espalda',    equipamiento: 'Mancuernas',    musculos: ['Dorsales', 'Romboides'],            frames: gif('Bent_Over_Two-Dumbbell_Row') },
  { id: 'esp-13', nombre: 'Remo con apoyo',                   grupo: 'Espalda',    equipamiento: 'Mancuernas',    musculos: ['Dorsales', 'Romboides'],            frames: gif('Dumbbell_Incline_Row') },
  { id: 'esp-14', nombre: 'Remo serrucho c/cable',            grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsal', 'Trapecios'],              frames: gif('One-Arm_Dumbbell_Row') },
  { id: 'esp-15', nombre: 'Remo serrucho c/manc',             grupo: 'Espalda',    equipamiento: 'Mancuernas',    musculos: ['Dorsal', 'Romboides'],              frames: gif('One-Arm_Dumbbell_Row') },
  { id: 'esp-16', nombre: 'Remo hammer',                      grupo: 'Espalda',    equipamiento: 'Máquina',       musculos: ['Dorsales', 'Bíceps'],               frames: gif('Bent_Over_Barbell_Row') },
  { id: 'esp-17', nombre: 'Despegues',                        grupo: 'Espalda',    equipamiento: 'Barra',         musculos: ['Lumbar', 'Glúteos'],                frames: gif('Barbell_Deadlift') },
  { id: 'esp-18', nombre: 'Arranques',                        grupo: 'Espalda',    equipamiento: 'Barra',         musculos: ['Espalda completa', 'Piernas'],      frames: gif('Power_Clean') },
  { id: 'esp-19', nombre: 'Cargada de potencia',              grupo: 'Espalda',    equipamiento: 'Mancuernas',    musculos: ['Espalda completa', 'Hombros'],      frames: gif('Power_Clean') },
  { id: 'esp-20', nombre: 'Buenos días',                      grupo: 'Espalda',    equipamiento: 'Barra',         musculos: ['Lumbar', 'Isquiotibiales'],         frames: gif('Good_Morning') },
  { id: 'esp-21', nombre: 'Hiper extensiones',                grupo: 'Espalda',    equipamiento: 'Máquina',       musculos: ['Lumbar', 'Glúteos'],                frames: gif('Hyperextensions_(Back_Extensions)') },
  { id: 'esp-22', nombre: 'Pull overt Disco',                 grupo: 'Espalda',    equipamiento: 'Disco',         musculos: ['Dorsales', 'Pectorales'],           frames: gif('Bent-Arm_Barbell_Pullover') },
  { id: 'esp-23', nombre: 'Pull overt Barra',                 grupo: 'Espalda',    equipamiento: 'Barra',         musculos: ['Dorsales', 'Pectorales'],           frames: gif('Bent-Arm_Barbell_Pullover') },
  { id: 'esp-24', nombre: 'Pull overt Polea',                 grupo: 'Espalda',    equipamiento: 'Polea',         musculos: ['Dorsales'],                         frames: gif('Straight-Arm_Dumbbell_Pullover') },

  // ─── TRÍCEPS (18) ────────────────────────────────────────────────────────────
  { id: 'tri-01', nombre: 'Triceps de fuerza',                grupo: 'Tríceps',    equipamiento: 'Barra',         musculos: ['Tríceps'],                          frames: gif('Close-Grip_Barbell_Bench_Press') },
  { id: 'tri-02', nombre: 'Triceps a la frente',              grupo: 'Tríceps',    equipamiento: 'Barra EZ',      musculos: ['Tríceps'],                          frames: gif('EZ-Bar_Skullcrusher') },
  { id: 'tri-03', nombre: 'Triceps a la frente barra',        grupo: 'Tríceps',    equipamiento: 'Barra',         musculos: ['Tríceps'],                          frames: gif('EZ-Bar_Skullcrusher') },
  { id: 'tri-04', nombre: 'Triceps a la frente manc',         grupo: 'Tríceps',    equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                          frames: gif('Decline_Dumbbell_Triceps_Extension') },
  { id: 'tri-05', nombre: 'Polea parado (tirones)',            grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Triceps_Pushdown') },
  { id: 'tri-06', nombre: 'Polea parado agarre en V',         grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Triceps_Pushdown_-_Rope_Attachment') },
  { id: 'tri-07', nombre: 'Polea concentrado',                grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Cable_One_Arm_Tricep_Extension') },
  { id: 'tri-08', nombre: 'Máquina de triceps',               grupo: 'Tríceps',    equipamiento: 'Máquina',       musculos: ['Tríceps'],                          frames: gif('Dip_Machine') },
  { id: 'tri-09', nombre: 'Triceps francés c/barra',          grupo: 'Tríceps',    equipamiento: 'Barra',         musculos: ['Tríceps'],                          frames: gif('EZ-Bar_Skullcrusher') },
  { id: 'tri-10', nombre: 'Triceps francés c/manc',           grupo: 'Tríceps',    equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                          frames: gif('Decline_Dumbbell_Triceps_Extension') },
  { id: 'tri-11', nombre: 'Triceps lagartija',                grupo: 'Tríceps',    equipamiento: 'Peso corporal', musculos: ['Tríceps'],                          frames: gif('Close-Grip_Push-Up_off_of_a_Dumbbell') },
  { id: 'tri-12', nombre: 'Fondos paralelas',                 grupo: 'Tríceps',    equipamiento: 'Peso corporal', musculos: ['Tríceps', 'Pectorales'],            frames: gif('Dips_-_Triceps_Version') },
  { id: 'tri-13', nombre: 'Fondos en el banco',               grupo: 'Tríceps',    equipamiento: 'Banco',         musculos: ['Tríceps'],                          frames: gif('Bench_Dips') },
  { id: 'tri-14', nombre: 'Patada de burro polea',            grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Cable_Rope_Overhead_Triceps_Extension') },
  { id: 'tri-15', nombre: 'Patada de burro manc',             grupo: 'Tríceps',    equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                          frames: gif('Tricep_Dumbbell_Kickback') },
  { id: 'tri-16', nombre: 'Polea parado lateral',             grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Cable_One_Arm_Tricep_Extension') },
  { id: 'tri-17', nombre: 'Polea katana',                     grupo: 'Tríceps',    equipamiento: 'Polea',         musculos: ['Tríceps'],                          frames: gif('Triceps_Pushdown') },
  { id: 'tri-18', nombre: 'Katana mancuerna',                 grupo: 'Tríceps',    equipamiento: 'Mancuernas',    musculos: ['Tríceps'],                          frames: gif('Decline_Dumbbell_Triceps_Extension') },

  // ─── HOMBROS (23) ────────────────────────────────────────────────────────────
  { id: 'hom-01', nombre: 'Press rotativa',                   grupo: 'Hombros',    equipamiento: 'Máquina',       musculos: ['Deltoides'],                        frames: gif('Shoulder_Press_-_With_Bands') },
  { id: 'hom-02', nombre: 'Press tras nuca',                  grupo: 'Hombros',    equipamiento: 'Barra',         musculos: ['Deltoides posterior'],              frames: gif('Barbell_Shoulder_Press') },
  { id: 'hom-03', nombre: 'Press militar',                    grupo: 'Hombros',    equipamiento: 'Barra',         musculos: ['Deltoides', 'Trapecios'],           frames: gif('Barbell_Shoulder_Press') },
  { id: 'hom-04', nombre: 'Press hammer neutro',              grupo: 'Hombros',    equipamiento: 'Máquina',       musculos: ['Deltoides'],                        frames: gif('Shoulder_Press_-_With_Bands') },
  { id: 'hom-05', nombre: 'Press hammer lateral',             grupo: 'Hombros',    equipamiento: 'Máquina',       musculos: ['Deltoides lateral'],                frames: gif('Shoulder_Press_-_With_Bands') },
  { id: 'hom-06', nombre: 'Press c/mancuerna',                grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides'],                        frames: gif('Dumbbell_Shoulder_Press') },
  { id: 'hom-07', nombre: 'Press c/manc 1 brazo',             grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides'],                        frames: gif('Dumbbell_One-Arm_Shoulder_Press') },
  { id: 'hom-08', nombre: 'Lateral en polea',                 grupo: 'Hombros',    equipamiento: 'Polea',         musculos: ['Deltoides lateral'],                frames: gif('Side_Lateral_Raise') },
  { id: 'hom-09', nombre: 'Vuelo lateral mancuerna',          grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],                frames: gif('Side_Lateral_Raise') },
  { id: 'hom-10', nombre: 'Vuelo lateral máquina',            grupo: 'Hombros',    equipamiento: 'Máquina',       musculos: ['Deltoides lateral'],                frames: gif('Side_Lateral_Raise') },
  { id: 'hom-11', nombre: 'Vuelo lateral bco 90°',            grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],                frames: gif('Side_Lateral_Raise') },
  { id: 'hom-12', nombre: 'Vuelo lateral bco 45°',            grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides lateral'],                frames: gif('Side_Lateral_Raise') },
  { id: 'hom-13', nombre: 'Vuelo frontal',                    grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides anterior'],               frames: gif('Side_Laterals_to_Front_Raise') },
  { id: 'hom-14', nombre: 'Vuelo posterior cruzado',          grupo: 'Hombros',    equipamiento: 'Polea',         musculos: ['Deltoides posterior'],              frames: gif('Cable_Rear_Delt_Fly') },
  { id: 'hom-15', nombre: 'Vuelo posterior mancuerna',        grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Deltoides posterior'],              frames: gif('Reverse_Flyes') },
  { id: 'hom-16', nombre: 'Posterior en polea',               grupo: 'Hombros',    equipamiento: 'Polea',         musculos: ['Deltoides posterior'],              frames: gif('Cable_Rear_Delt_Fly') },
  { id: 'hom-17', nombre: 'Posterior c/barra',                grupo: 'Hombros',    equipamiento: 'Barra',         musculos: ['Deltoides posterior', 'Trapecios'], frames: gif('Barbell_Rear_Delt_Row') },
  { id: 'hom-18', nombre: 'Posterior c/soga polea',           grupo: 'Hombros',    equipamiento: 'Polea',         musculos: ['Deltoides posterior'],              frames: gif('Cable_Rear_Delt_Fly') },
  { id: 'hom-19', nombre: 'Frontal mas Explosivo',            grupo: 'Hombros',    equipamiento: 'Barra',         musculos: ['Deltoides anterior', 'Trapecios'],  frames: gif('Barbell_Shoulder_Press') },
  { id: 'hom-20', nombre: 'Remo de pie',                      grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Trapecios', 'Deltoides'],           frames: gif('Standing_Dumbbell_Upright_Row') },
  { id: 'hom-21', nombre: 'Trapecio c/manc',                  grupo: 'Hombros',    equipamiento: 'Mancuernas',    musculos: ['Trapecios'],                        frames: gif('Dumbbell_Shrug') },
  { id: 'hom-22', nombre: 'Trapecio c/barra',                 grupo: 'Hombros',    equipamiento: 'Barra',         musculos: ['Trapecios'],                        frames: gif('Barbell_Shrug') },
  { id: 'hom-23', nombre: 'Trapecio c/barra polea',           grupo: 'Hombros',    equipamiento: 'Polea',         musculos: ['Trapecios'],                        frames: gif('Dumbbell_Shrug') },

  // ─── BÍCEPS (17) ─────────────────────────────────────────────────────────────
  { id: 'bic-01', nombre: 'Biceps barra',                     grupo: 'Bíceps',     equipamiento: 'Barra',         musculos: ['Bíceps'],                           frames: gif('Barbell_Curl') },
  { id: 'bic-02', nombre: 'Biceps banco scott',               grupo: 'Bíceps',     equipamiento: 'Barra',         musculos: ['Bíceps'],                           frames: gif('Preacher_Curl') },
  { id: 'bic-03', nombre: 'Biceps máquina',                   grupo: 'Bíceps',     equipamiento: 'Máquina',       musculos: ['Bíceps'],                           frames: gif('Machine_Preacher_Curls') },
  { id: 'bic-04', nombre: 'Biceps c/manc',                    grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('Dumbbell_Bicep_Curl') },
  { id: 'bic-05', nombre: 'Biceps c/manc scott',              grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('One_Arm_Dumbbell_Preacher_Curl') },
  { id: 'bic-06', nombre: 'Biceps c/manc conc',               grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('Concentration_Curls') },
  { id: 'bic-07', nombre: 'Biceps c/manc alternado',          grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('Dumbbell_Alternate_Bicep_Curl') },
  { id: 'bic-08', nombre: 'Biceps c/manc Bco 45°',            grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('Alternate_Incline_Dumbbell_Curl') },
  { id: 'bic-09', nombre: 'Biceps c/manc Martillo Bco 45°',   grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps', 'Braquial'],               frames: gif('Hammer_Curls') },
  { id: 'bic-10', nombre: 'Biceps 21 mancuernas',             grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps'],                           frames: gif('Dumbbell_Alternate_Bicep_Curl') },
  { id: 'bic-11', nombre: 'Biceps 21 barra / neutro',         grupo: 'Bíceps',     equipamiento: 'Barra',         musculos: ['Bíceps'],                           frames: gif('Barbell_Curl') },
  { id: 'bic-12', nombre: 'Biceps en polea',                  grupo: 'Bíceps',     equipamiento: 'Polea',         musculos: ['Bíceps'],                           frames: gif('Standing_Biceps_Cable_Curl') },
  { id: 'bic-13', nombre: 'Biceps en polea en cruz',          grupo: 'Bíceps',     equipamiento: 'Polea',         musculos: ['Bíceps'],                           frames: gif('Standing_Biceps_Cable_Curl') },
  { id: 'bic-14', nombre: 'Biceps 21 barra',                  grupo: 'Bíceps',     equipamiento: 'Barra',         musculos: ['Bíceps'],                           frames: gif('Barbell_Curl') },
  { id: 'bic-15', nombre: 'Biceps conc. c/cable',             grupo: 'Bíceps',     equipamiento: 'Polea',         musculos: ['Bíceps'],                           frames: gif('Cable_Preacher_Curl') },
  { id: 'bic-16', nombre: 'Biceps martillo',                  grupo: 'Bíceps',     equipamiento: 'Mancuernas',    musculos: ['Bíceps', 'Braquial'],               frames: gif('Hammer_Curls') },
  { id: 'bic-17', nombre: 'Biceps conc. c/barra',             grupo: 'Bíceps',     equipamiento: 'Barra',         musculos: ['Bíceps'],                           frames: gif('Preacher_Curl') },

  // ─── ANTEBRAZO (5) ───────────────────────────────────────────────────────────
  { id: 'ant-01', nombre: 'Curl de muñeca barra',             grupo: 'Antebrazo',  equipamiento: 'Barra',         musculos: ['Antebrazos'],                       frames: gif('Palms-Up_Barbell_Wrist_Curl_Over_A_Bench') },
  { id: 'ant-02', nombre: 'Curl de muñeca mancuerna',         grupo: 'Antebrazo',  equipamiento: 'Mancuernas',    musculos: ['Antebrazos'],                       frames: gif('Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench') },
  { id: 'ant-03', nombre: 'Curl prono barra',                 grupo: 'Antebrazo',  equipamiento: 'Barra',         musculos: ['Antebrazos', 'Bíceps'],             frames: gif('Palms-Down_Wrist_Curl_Over_A_Bench') },
  { id: 'ant-04', nombre: 'Extensión de muñeca',              grupo: 'Antebrazo',  equipamiento: 'Mancuernas',    musculos: ['Antebrazos'],                       frames: gif('Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench') },
  { id: 'ant-05', nombre: 'Hand grip',                        grupo: 'Antebrazo',  equipamiento: 'Accesorio',     musculos: ['Antebrazos'],                       frames: gif('Cable_Wrist_Curl') },

  // ─── PIERNAS (23) ────────────────────────────────────────────────────────────
  { id: 'pie-01', nombre: 'Sentadilla máq. Smit',             grupo: 'Piernas',    equipamiento: 'Máquina Smith', musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Smith_Machine_Squat') },
  { id: 'pie-02', nombre: 'Sentadilla c/barra',               grupo: 'Piernas',    equipamiento: 'Barra',         musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Barbell_Squat') },
  { id: 'pie-03', nombre: 'Sentadilla frontal',               grupo: 'Piernas',    equipamiento: 'Barra',         musculos: ['Cuádriceps'],                       frames: gif('Front_Squat_(Clean_Grip)') },
  { id: 'pie-04', nombre: 'Sentadilla Sysy',                  grupo: 'Piernas',    equipamiento: 'Barra',         musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Barbell_Full_Squat') },
  { id: 'pie-05', nombre: 'Sentadilla Búlgara',               grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Barbell_Side_Split_Squat') },
  { id: 'pie-06', nombre: 'Prensa 45°',                       grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Leg_Press') },
  { id: 'pie-07', nombre: 'Sillón cuádriceps',                grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Cuádriceps'],                       frames: gif('Leg_Extensions') },
  { id: 'pie-08', nombre: 'Camilla b. Femoral',               grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Isquiotibiales'],                   frames: gif('Lying_Leg_Curls') },
  { id: 'pie-09', nombre: 'Camilla b. Femoral sentado',       grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Isquiotibiales'],                   frames: gif('Seated_Leg_Curl') },
  { id: 'pie-10', nombre: 'Peso muerto 1 pierna',             grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Isquiotibiales', 'Glúteos'],        frames: gif('Romanian_Deadlift') },
  { id: 'pie-11', nombre: 'Gemelos sentado',                  grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Gemelos'],                          frames: gif('Seated_Calf_Raise') },
  { id: 'pie-12', nombre: 'Gemelos parado',                   grupo: 'Piernas',    equipamiento: 'Peso corporal', musculos: ['Gemelos'],                          frames: gif('Standing_Calf_Raises') },
  { id: 'pie-13', nombre: 'Sentadilla goblet',                grupo: 'Piernas',    equipamiento: 'Pesa rusa',     musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Dumbbell_Squat') },
  { id: 'pie-14', nombre: 'Sentadilla sumo',                  grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Aductores'],          frames: gif('Sumo_Squat') },
  { id: 'pie-15', nombre: 'Peso muerto sumo',                 grupo: 'Piernas',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Sumo_Deadlift') },
  { id: 'pie-16', nombre: 'Estocadas caminando',              grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Barbell_Walking_Lunge') },
  { id: 'pie-17', nombre: 'Estocadas inversas',               grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Glúteos'],            frames: gif('Crossover_Reverse_Lunge') },
  { id: 'pie-18', nombre: 'Sentadilla pistola',               grupo: 'Piernas',    equipamiento: 'Peso corporal', musculos: ['Cuádriceps'],                       frames: gif('Kettlebell_Pistol_Squat') },
  { id: 'pie-19', nombre: 'Prensa estrecha',                  grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Cuádriceps'],                       frames: gif('Narrow_Stance_Leg_Press') },
  { id: 'pie-20', nombre: 'Curl femoral parado',              grupo: 'Piernas',    equipamiento: 'Máquina',       musculos: ['Isquiotibiales'],                   frames: gif('Lying_Leg_Curls') },
  { id: 'pie-21', nombre: 'Sentadilla frontal manc',          grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps'],                       frames: gif('Dumbbell_Squat') },
  { id: 'pie-22', nombre: 'Sentadilla lateral manc',          grupo: 'Piernas',    equipamiento: 'Mancuernas',    musculos: ['Cuádriceps', 'Aductores'],          frames: gif('Dumbbell_Squat') },
  { id: 'pie-23', nombre: 'Patada trasera polea',             grupo: 'Piernas',    equipamiento: 'Polea',         musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Glute_Kickback') },

  // ─── GLÚTEOS (29) ────────────────────────────────────────────────────────────
  { id: 'glu-01', nombre: 'Hip thrust',                       grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos'],                          frames: gif('Barbell_Hip_Thrust') },
  { id: 'glu-02', nombre: 'Hip thrust 1 pierna',              grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos'],                          frames: gif('Single_Leg_Glute_Bridge') },
  { id: 'glu-03', nombre: 'Máquina hip thrust',               grupo: 'Glúteos',    equipamiento: 'Máquina',       musculos: ['Glúteos'],                          frames: gif('Barbell_Hip_Thrust') },
  { id: 'glu-04', nombre: 'Estocadas con barra',              grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Barbell_Lunge') },
  { id: 'glu-05', nombre: 'Estocadas con manc',               grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Dumbbell_Lunges') },
  { id: 'glu-06', nombre: 'Peso muerto rumano',               grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Romanian_Deadlift') },
  { id: 'glu-07', nombre: 'Patada glúteos cable',             grupo: 'Glúteos',    equipamiento: 'Polea',         musculos: ['Glúteos'],                          frames: gif('Glute_Kickback') },
  { id: 'glu-08', nombre: 'Aductores máquina',                grupo: 'Glúteos',    equipamiento: 'Máquina',       musculos: ['Aductores'],                        frames: gif('Cable_Hip_Adduction') },
  { id: 'glu-09', nombre: 'Buenos días en polea',             grupo: 'Glúteos',    equipamiento: 'Polea',         musculos: ['Lumbar', 'Glúteos'],                frames: gif('Good_Morning') },
  { id: 'glu-10', nombre: 'Peso muerto rumano manc',          grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Romanian_Deadlift') },
  { id: 'glu-11', nombre: 'Hip thrust manc',                  grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos'],                          frames: gif('Single_Leg_Glute_Bridge') },
  { id: 'glu-12', nombre: 'Sentadilla búlgara manc',          grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Barbell_Side_Split_Squat') },
  { id: 'glu-13', nombre: 'Abducción en máquina',             grupo: 'Glúteos',    equipamiento: 'Máquina',       musculos: ['Glúteo medio', 'Abductores'],       frames: gif('Cable_Hip_Adduction') },
  { id: 'glu-14', nombre: 'Patada burro con manc',            grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos'],                          frames: gif('Glute_Kickback') },
  { id: 'glu-15', nombre: 'Extensión glúteo polea',           grupo: 'Glúteos',    equipamiento: 'Polea',         musculos: ['Glúteos'],                          frames: gif('Glute_Kickback') },
  { id: 'glu-16', nombre: 'Glúteo en máquina 4 apoyos',       grupo: 'Glúteos',    equipamiento: 'Máquina',       musculos: ['Glúteos'],                          frames: gif('Glute_Kickback') },
  { id: 'glu-17', nombre: 'Sentadilla sumo barra',            grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Aductores'],             frames: gif('Sumo_Deadlift') },
  { id: 'glu-18', nombre: 'Estocada lateral manc',            grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Aductores'],             frames: gif('Side_Lunge') },
  { id: 'glu-19', nombre: 'Peso muerto kettle 1 pierna',      grupo: 'Glúteos',    equipamiento: 'Pesa rusa',     musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Romanian_Deadlift_from_Deficit') },
  { id: 'glu-20', nombre: 'Good morning barra',               grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Lumbar'],                frames: gif('Good_Morning') },
  { id: 'glu-21', nombre: 'Hip thrust kettle',                grupo: 'Glúteos',    equipamiento: 'Pesa rusa',     musculos: ['Glúteos'],                          frames: gif('Barbell_Glute_Bridge') },
  { id: 'glu-22', nombre: 'Estocada paso atrás barra',        grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Barbell_Lunge') },
  { id: 'glu-23', nombre: 'Estocada inversa manc',            grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Crossover_Reverse_Lunge') },
  { id: 'glu-24', nombre: 'Peso muerto sumo manc',            grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Sumo_Deadlift') },
  { id: 'glu-25', nombre: 'Sentadilla con banda',             grupo: 'Glúteos',    equipamiento: 'Banda',         musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Bodyweight_Squat') },
  { id: 'glu-26', nombre: 'Arabesque manc',                   grupo: 'Glúteos',    equipamiento: 'Mancuernas',    musculos: ['Glúteos', 'Isquiotibiales'],        frames: gif('Romanian_Deadlift') },
  { id: 'glu-27', nombre: 'Elevación lateral pierna',         grupo: 'Glúteos',    equipamiento: 'Peso corporal', musculos: ['Glúteo medio'],                     frames: gif('Band_Hip_Adductions') },
  { id: 'glu-28', nombre: 'Hiperextensión glúteo',            grupo: 'Glúteos',    equipamiento: 'Máquina',       musculos: ['Glúteos', 'Lumbar'],                frames: gif('Hyperextensions_(Back_Extensions)') },
  { id: 'glu-29', nombre: 'Walking lunges con barra',         grupo: 'Glúteos',    equipamiento: 'Barra',         musculos: ['Glúteos', 'Cuádriceps'],            frames: gif('Barbell_Walking_Lunge') },

  // ─── ABDOMINALES (17) ────────────────────────────────────────────────────────
  { id: 'abd-01', nombre: 'Abd. Oblicuos',                    grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Oblicuos'],                        frames: gif('Cross-Body_Crunch') },
  { id: 'abd-02', nombre: 'Patada al cielo',                  grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales'],                    frames: gif('Hanging_Leg_Raise') },
  { id: 'abd-03', nombre: 'Abd. Banco',                       grupo: 'Abdominales', equipamiento: 'Banco',         musculos: ['Abdominales'],                    frames: gif('Decline_Crunch') },
  { id: 'abd-04', nombre: 'Levantamiento de piernas',         grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales bajos'],              frames: gif('Hanging_Leg_Raise') },
  { id: 'abd-05', nombre: 'Encogimiento de piernas',          grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Abdominales'],                    frames: gif('Decline_Crunch') },
  { id: 'abd-06', nombre: 'Crunches',                         grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Recto abdominal'],                frames: gif('Crunches') },
  { id: 'abd-07', nombre: 'Plancha frontal',                  grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Core', 'Abdominales'],            frames: gif('Plank') },
  { id: 'abd-08', nombre: 'Plancha lateral',                  grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Oblicuos', 'Core'],              frames: gif('Side_Bridge') },
  { id: 'abd-09', nombre: 'Russian twist',                    grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Oblicuos'],                       frames: gif('Cable_Russian_Twists') },
  { id: 'abd-10', nombre: 'Crunches inclinados',              grupo: 'Abdominales', equipamiento: 'Banco',         musculos: ['Recto abdominal'],                frames: gif('Decline_Crunch') },
  { id: 'abd-11', nombre: 'Crunches negativos',               grupo: 'Abdominales', equipamiento: 'Banco',         musculos: ['Recto abdominal'],                frames: gif('Decline_Crunch') },
  { id: 'abd-12', nombre: 'Twist con disco',                  grupo: 'Abdominales', equipamiento: 'Disco',         musculos: ['Oblicuos'],                       frames: gif('Cable_Russian_Twists') },
  { id: 'abd-13', nombre: 'Rueda abdominal',                  grupo: 'Abdominales', equipamiento: 'Accesorio',     musculos: ['Core', 'Dorsales'],              frames: gif('Ab_Roller') },
  { id: 'abd-14', nombre: 'Flexión lateral',                  grupo: 'Abdominales', equipamiento: 'Mancuernas',   musculos: ['Oblicuos'],                       frames: gif('Cross-Body_Crunch') },
  { id: 'abd-15', nombre: 'Bird dog',                         grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Core', 'Lumbar'],                frames: gif('Plank') },
  { id: 'abd-16', nombre: 'Plancha con toque de hombros',     grupo: 'Abdominales', equipamiento: 'Peso corporal', musculos: ['Core'],                          frames: gif('Plank') },
  { id: 'abd-17', nombre: 'Pallof press',                     grupo: 'Abdominales', equipamiento: 'Polea',         musculos: ['Core', 'Oblicuos'],              frames: gif('Cable_Crunch') },

  // ─── AERÓBICOS (3) ───────────────────────────────────────────────────────────
  { id: 'aer-01', nombre: 'Cinta (trotadora)',                grupo: 'Aeróbicos',  equipamiento: 'Máquina',       musculos: ['Cardiovascular', 'Piernas'],        frames: gif('Running,_Treadmill') },
  { id: 'aer-02', nombre: 'Bicicleta estática',               grupo: 'Aeróbicos',  equipamiento: 'Máquina',       musculos: ['Cardiovascular', 'Piernas'],        frames: gif('Bicycling,_Stationary') },
  { id: 'aer-03', nombre: 'Salto a la soga',                  grupo: 'Aeróbicos',  equipamiento: 'Soga',          musculos: ['Cardiovascular', 'Gemelos'],        frames: gif('Rope_Jumping') },
]

export const GRUPOS = [...new Set(EJERCICIOS.map(e => e.grupo))]

export function getByGrupo(grupo) {
  return EJERCICIOS.filter(e => e.grupo === grupo)
}

export function getById(id) {
  return EJERCICIOS.find(e => e.id === id) ?? null
}
