// Translations for values returned by the ExerciseDB API

export const BODY_PARTS_ES = {
  'back':        'Espalda',
  'cardio':      'Cardio',
  'chest':       'Pecho',
  'lower arms':  'Antebrazos',
  'lower legs':  'Pantorrillas',
  'neck':        'Cuello',
  'shoulders':   'Hombros',
  'upper arms':  'Brazos',
  'upper legs':  'Piernas',
  'waist':       'Cintura / Core',
}

export const MUSCLES_ES = {
  'abs':                    'Abdominales',
  'adductor longus':        'Aductor largo',
  'adductor magnus':        'Aductor mayor',
  'biceps':                 'Bíceps',
  'biceps brachii':         'Bíceps braquial',
  'brachialis':             'Braquial',
  'brachioradialis':        'Braquiorradial',
  'cardiovascular system':  'Sistema cardiovascular',
  'calves':                 'Pantorrillas',
  'deltoid anterior':       'Deltoides anterior',
  'deltoid lateral':        'Deltoides lateral',
  'deltoid posterior':      'Deltoides posterior',
  'delts':                  'Deltoides',
  'erector spinae':         'Erectores de la columna',
  'forearms':               'Antebrazos',
  'gastrocnemius':          'Gastrocnemio',
  'glutes':                 'Glúteos',
  'gluteus maximus':        'Glúteo mayor',
  'gluteus medius':         'Glúteo medio',
  'hamstrings':             'Isquiotibiales',
  'hip flexors':            'Flexores de cadera',
  'iliopsoas':              'Iliopsoas',
  'infraspinatus':          'Infraespinoso',
  'intercostals':           'Intercostales',
  'lats':                   'Dorsales',
  'latissimus dorsi':       'Dorsal ancho',
  'levator scapulae':       'Elevador de la escápula',
  'lower back':             'Zona lumbar',
  'obliques':               'Oblicuos',
  'pectorals':              'Pectorales',
  'pectoralis major':       'Pectoral mayor',
  'pectoralis major clavicular head': 'Pectoral mayor (cabeza clavicular)',
  'pectoralis minor':       'Pectoral menor',
  'quads':                  'Cuádriceps',
  'quadriceps':             'Cuádriceps',
  'rectus abdominis':       'Recto abdominal',
  'rhomboids':              'Romboides',
  'rotator cuff':           'Manguito rotador',
  'serratus anterior':      'Serrato anterior',
  'shoulders':              'Hombros',
  'soleus':                 'Sóleo',
  'spine':                  'Columna',
  'subscapularis':          'Subescapular',
  'supraspinatus':          'Supraespinoso',
  'teres major':            'Redondo mayor',
  'teres minor':            'Redondo menor',
  'tibialis anterior':      'Tibial anterior',
  'traps':                  'Trapecios',
  'trapezius':              'Trapecio',
  'triceps':                'Tríceps',
  'triceps brachii':        'Tríceps braquial',
  'upper back':             'Espalda alta',
  'vastus lateralis':       'Vasto lateral',
  'vastus medialis':        'Vasto medial',
  'wrist extensors':        'Extensores de muñeca',
  'wrist flexors':          'Flexores de muñeca',
}

export const EQUIPMENT_ES = {
  'assisted':               'Asistido',
  'band':                   'Banda',
  'barbell':                'Barra olímpica',
  'body weight':            'Peso corporal',
  'bosu ball':              'Bosu',
  'cable':                  'Polea',
  'dumbbell':               'Mancuernas',
  'elliptical machine':     'Elíptica',
  'ez barbell':             'Barra EZ',
  'hammer':                 'Martillo',
  'kettlebell':             'Pesa rusa',
  'leverage machine':       'Máquina de palanca',
  'medicine ball':          'Balón medicinal',
  'olympic barbell':        'Barra olímpica',
  'resistance band':        'Banda elástica',
  'roller':                 'Rodillo',
  'rope':                   'Cuerda',
  'skierg machine':         'Máquina SkiErg',
  'sled machine':           'Trineo',
  'smith machine':          'Máquina Smith',
  'stability ball':         'Pelota de estabilidad',
  'stationary bike':        'Bicicleta estática',
  'stepmill machine':       'Escaladora',
  'tire':                   'Neumático',
  'trap bar':               'Barra trampa',
  'upper body ergometer':   'Ergómetro de brazos',
  'weighted':               'Con peso',
  'wheel roller':           'Rueda abdominal',
}

/**
 * Translate a single value using a dictionary.
 * Falls back to the original value (capitalized) if not found.
 */
export function t(value, dict) {
  if (!value) return value
  const key = value.toLowerCase()
  return dict[key] ?? (value.charAt(0).toUpperCase() + value.slice(1))
}

export const tBodyPart  = (v) => t(v, BODY_PARTS_ES)
export const tMuscle    = (v) => t(v, MUSCLES_ES)
export const tEquipment = (v) => t(v, EQUIPMENT_ES)

/**
 * Translate exercise instructions: remove the "Step:N " prefix
 * (the API uses English prefixes).
 */
export function translateInstruction(step) {
  return step.replace(/^Step:\d+\s*/i, '').trim()
}
