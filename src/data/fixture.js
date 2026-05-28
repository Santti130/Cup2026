// src/data/fixture.js
// Fixture completo de la fase de grupos — Mundial 2026
// Horarios en hora de Colombia/Ecuador/Perú (UTC-5)

export const fixture = [

    // ─── JUEVES 11 DE JUNIO ───
    {
        dia: 'Jueves 11 de Junio 2026',
        fecha: '2026-06-11',
        partidos: [
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'México', abrev: 'MEX', codigo: 'mx' },
                equipo2: { nombre: 'Sudáfrica', abrev: 'RSA', codigo: 'za' },
                hora: '14:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Corea del Sur', abrev: 'KOR', codigo: 'kr' },
                equipo2: { nombre: 'Rep. Checa', abrev: 'CZE', codigo: 'cz' },
                hora: '21:00',
                estadio: 'Estadio Akron', ciudad: 'Guadalajara'
            }
        ]
    },

    // ─── VIERNES 12 DE JUNIO ───
    {
        dia: 'Viernes 12 de Junio 2026',
        fecha: '2026-06-12',
        partidos: [
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Canadá', abrev: 'CAN', codigo: 'ca' },
                equipo2: { nombre: 'Bosnia y Herz.', abrev: 'BIH', codigo: 'ba' },
                hora: '14:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Estados Unidos', abrev: 'USA', codigo: 'us' },
                equipo2: { nombre: 'Paraguay', abrev: 'PAR', codigo: 'py' },
                hora: '20:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            }
        ]
    },

    // ─── SÁBADO 13 DE JUNIO ───
    {
        dia: 'Sábado 13 de Junio 2026',
        fecha: '2026-06-13',
        partidos: [
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Catar', abrev: 'QAT', codigo: 'qa' },
                equipo2: { nombre: 'Suiza', abrev: 'SUI', codigo: 'ch' },
                hora: '14:00',
                estadio: "Levi's Stadium", ciudad: 'Santa Clara'
            },
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Brasil', abrev: 'BRA', codigo: 'br' },
                equipo2: { nombre: 'Marruecos', abrev: 'MAR', codigo: 'ma' },
                hora: '17:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Haití', abrev: 'HAI', codigo: 'ht' },
                equipo2: { nombre: 'Escocia', abrev: 'SCO', codigo: 'gb-sct' },
                hora: '20:00',
                estadio: 'Gillette Stadium', ciudad: 'Foxborough'
            },
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Suiza', abrev: 'SUI', codigo: 'ch' },
                equipo2: { nombre: 'Catar', abrev: 'QAT', codigo: 'qa' },
                hora: '23:00',
                estadio: "Levi's Stadium", ciudad: 'Santa Clara'
            }
        ]
    },

    // ─── DOMINGO 14 DE JUNIO ───
    {
        dia: 'Domingo 14 de Junio 2026',
        fecha: '2026-06-14',
        partidos: [
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Australia', abrev: 'AUS', codigo: 'au' },
                equipo2: { nombre: 'Turquía', abrev: 'TUR', codigo: 'tr' },
                hora: '00:00',
                estadio: 'BC Place', ciudad: 'Vancouver'
            },
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Alemania', abrev: 'GER', codigo: 'de' },
                equipo2: { nombre: 'Curazao', abrev: 'CUW', codigo: 'cw' },
                hora: '14:00',
                estadio: 'Lincoln Financial Field', ciudad: 'Philadelphia'
            },
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Costa de Marfil', abrev: 'CIV', codigo: 'ci' },
                equipo2: { nombre: 'Ecuador', abrev: 'ECU', codigo: 'ec' },
                hora: '17:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Países Bajos', abrev: 'NED', codigo: 'nl' },
                equipo2: { nombre: 'Japón', abrev: 'JPN', codigo: 'jp' },
                hora: '20:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Suecia', abrev: 'SWE', codigo: 'se' },
                equipo2: { nombre: 'Túnez', abrev: 'TUN', codigo: 'tn' },
                hora: '23:00',
                estadio: 'Estadio BBVA', ciudad: 'Monterrey'
            }
        ]
    },

    // ─── LUNES 15 DE JUNIO ───
    {
        dia: 'Lunes 15 de Junio 2026',
        fecha: '2026-06-15',
        partidos: [
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Bélgica', abrev: 'BEL', codigo: 'be' },
                equipo2: { nombre: 'Egipto', abrev: 'EGY', codigo: 'eg' },
                hora: '14:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            },
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Irán', abrev: 'IRN', codigo: 'ir' },
                equipo2: { nombre: 'Nueva Zelanda', abrev: 'NZL', codigo: 'nz' },
                hora: '17:00',
                estadio: 'Lumen Field', ciudad: 'Seattle'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'España', abrev: 'ESP', codigo: 'es' },
                equipo2: { nombre: 'Cabo Verde', abrev: 'CPV', codigo: 'cv' },
                hora: '20:00',
                estadio: 'Hard Rock Stadium', ciudad: 'Miami'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Arabia Saudita', abrev: 'KSA', codigo: 'sa' },
                equipo2: { nombre: 'Uruguay', abrev: 'URU', codigo: 'uy' },
                hora: '23:00',
                estadio: 'Mercedes-Benz Stadium', ciudad: 'Atlanta'
            }
        ]
    },

    // ─── MARTES 16 DE JUNIO ───
    {
        dia: 'Martes 16 de Junio 2026',
        fecha: '2026-06-16',
        partidos: [
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Francia', abrev: 'FRA', codigo: 'fr' },
                equipo2: { nombre: 'Senegal', abrev: 'SEN', codigo: 'sn' },
                hora: '14:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Irak', abrev: 'IRQ', codigo: 'iq' },
                equipo2: { nombre: 'Noruega', abrev: 'NOR', codigo: 'no' },
                hora: '17:00',
                estadio: 'Gillette Stadium', ciudad: 'Foxborough'
            },
            {
                grupo: 'Grupo J', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Argentina', abrev: 'ARG', codigo: 'ar' },
                equipo2: { nombre: 'Argelia', abrev: 'ALG', codigo: 'dz' },
                hora: '20:00',
                estadio: 'Arrowhead Stadium', ciudad: 'Kansas City'
            },
            {
                grupo: 'Grupo J', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Austria', abrev: 'AUT', codigo: 'at' },
                equipo2: { nombre: 'Jordania', abrev: 'JOR', codigo: 'jo' },
                hora: '23:00',
                estadio: "Levi's Stadium", ciudad: 'Santa Clara'
            }
        ]
    },

    // ─── MIÉRCOLES 17 DE JUNIO ───
    {
        dia: 'Miércoles 17 de Junio 2026',
        fecha: '2026-06-17',
        partidos: [
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Portugal', abrev: 'POR', codigo: 'pt' },
                equipo2: { nombre: 'RD Congo', abrev: 'COD', codigo: 'cd' },
                hora: '14:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Uzbekistán', abrev: 'UZB', codigo: 'uz' },
                equipo2: { nombre: 'Colombia', abrev: 'COL', codigo: 'co' },
                hora: '20:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Inglaterra', abrev: 'ENG', codigo: 'gb-eng' },
                equipo2: { nombre: 'Croacia', abrev: 'CRO', codigo: 'hr' },
                hora: '14:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Ghana', abrev: 'GHA', codigo: 'gh' },
                equipo2: { nombre: 'Panamá', abrev: 'PAN', codigo: 'pa' },
                hora: '17:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            }
        ]
    },

    // ─── JUEVES 18 DE JUNIO ───
    {
        dia: 'Jueves 18 de Junio 2026',
        fecha: '2026-06-18',
        partidos: [
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'México', abrev: 'MEX', codigo: 'mx' },
                equipo2: { nombre: 'Corea del Sur', abrev: 'KOR', codigo: 'kr' },
                hora: '14:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Argentina', abrev: 'ARG', codigo: 'ar' },
                equipo2: { nombre: 'España', abrev: 'ESP', codigo: 'es' },
                hora: '15:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Canadá', abrev: 'CAN', codigo: 'ca' },
                equipo2: { nombre: 'Suiza', abrev: 'SUI', codigo: 'ch' },
                hora: '17:00',
                estadio: 'BC Place', ciudad: 'Vancouver'
            },
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Estados Unidos', abrev: 'USA', codigo: 'us' },
                equipo2: { nombre: 'Australia', abrev: 'AUS', codigo: 'au' },
                hora: '20:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            }
        ]
    },

    // ─── VIERNES 19 DE JUNIO ───
    {
        dia: 'Viernes 19 de Junio 2026',
        fecha: '2026-06-19',
        partidos: [
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Alemania', abrev: 'GER', codigo: 'de' },
                equipo2: { nombre: 'Costa de Marfil', abrev: 'CIV', codigo: 'ci' },
                hora: '14:00',
                estadio: 'Lincoln Financial Field', ciudad: 'Philadelphia'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Países Bajos', abrev: 'NED', codigo: 'nl' },
                equipo2: { nombre: 'Suecia', abrev: 'SWE', codigo: 'se' },
                hora: '17:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            },
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Ecuador', abrev: 'ECU', codigo: 'ec' },
                equipo2: { nombre: 'Curazao', abrev: 'CUW', codigo: 'cw' },
                hora: '20:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Japón', abrev: 'JPN', codigo: 'jp' },
                equipo2: { nombre: 'Túnez', abrev: 'TUN', codigo: 'tn' },
                hora: '23:00',
                estadio: 'Estadio BBVA', ciudad: 'Monterrey'
            }
        ]
    },

    // ─── SÁBADO 20 DE JUNIO ───
    {
        dia: 'Sábado 20 de Junio 2026',
        fecha: '2026-06-20',
        partidos: [
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Bélgica', abrev: 'BEL', codigo: 'be' },
                equipo2: { nombre: 'Irán', abrev: 'IRN', codigo: 'ir' },
                hora: '14:00',
                estadio: 'Lumen Field', ciudad: 'Seattle'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'España', abrev: 'ESP', codigo: 'es' },
                equipo2: { nombre: 'Arabia Saudita', abrev: 'KSA', codigo: 'sa' },
                hora: '17:00',
                estadio: 'Hard Rock Stadium', ciudad: 'Miami'
            },
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Egipto', abrev: 'EGY', codigo: 'eg' },
                equipo2: { nombre: 'Nueva Zelanda', abrev: 'NZL', codigo: 'nz' },
                hora: '20:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Cabo Verde', abrev: 'CPV', codigo: 'cv' },
                equipo2: { nombre: 'Uruguay', abrev: 'URU', codigo: 'uy' },
                hora: '23:00',
                estadio: 'Mercedes-Benz Stadium', ciudad: 'Atlanta'
            }
        ]
    },

    // ─── DOMINGO 21 DE JUNIO ───
    {
        dia: 'Domingo 21 de Junio 2026',
        fecha: '2026-06-21',
        partidos: [
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Francia', abrev: 'FRA', codigo: 'fr' },
                equipo2: { nombre: 'Irak', abrev: 'IRQ', codigo: 'iq' },
                hora: '14:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo J', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Argentina', abrev: 'ARG', codigo: 'ar' },
                equipo2: { nombre: 'Austria', abrev: 'AUT', codigo: 'at' },
                hora: '17:00',
                estadio: 'Arrowhead Stadium', ciudad: 'Kansas City'
            },
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Senegal', abrev: 'SEN', codigo: 'sn' },
                equipo2: { nombre: 'Noruega', abrev: 'NOR', codigo: 'no' },
                hora: '20:00',
                estadio: 'Gillette Stadium', ciudad: 'Foxborough'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Brasil', abrev: 'BRA', codigo: 'br' },
                equipo2: { nombre: 'Alemania', abrev: 'GER', codigo: 'de' },
                hora: '21:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            }
        ]
    },

    // ─── LUNES 22 DE JUNIO ───
    {
        dia: 'Lunes 22 de Junio 2026',
        fecha: '2026-06-22',
        partidos: [
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Portugal', abrev: 'POR', codigo: 'pt' },
                equipo2: { nombre: 'Uzbekistán', abrev: 'UZB', codigo: 'uz' },
                hora: '14:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Inglaterra', abrev: 'ENG', codigo: 'gb-eng' },
                equipo2: { nombre: 'Ghana', abrev: 'GHA', codigo: 'gh' },
                hora: '17:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Colombia', abrev: 'COL', codigo: 'co' },
                equipo2: { nombre: 'RD Congo', abrev: 'COD', codigo: 'cd' },
                hora: '20:00',
                estadio: 'Estadio Akron', ciudad: 'Guadalajara'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Croacia', abrev: 'CRO', codigo: 'hr' },
                equipo2: { nombre: 'Panamá', abrev: 'PAN', codigo: 'pa' },
                hora: '23:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            }
        ]
    },

    // ─── MARTES 23 DE JUNIO ───
    {
        dia: 'Martes 23 de Junio 2026',
        fecha: '2026-06-23',
        partidos: [
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Sudáfrica', abrev: 'RSA', codigo: 'za' },
                equipo2: { nombre: 'Rep. Checa', abrev: 'CZE', codigo: 'cz' },
                hora: '14:00',
                estadio: 'Estadio Akron', ciudad: 'Guadalajara'
            },
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Bosnia y Herz.', abrev: 'BIH', codigo: 'ba' },
                equipo2: { nombre: 'Catar', abrev: 'QAT', codigo: 'qa' },
                hora: '17:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Marruecos', abrev: 'MAR', codigo: 'ma' },
                equipo2: { nombre: 'Escocia', abrev: 'SCO', codigo: 'gb-sct' },
                hora: '20:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Paraguay', abrev: 'PAR', codigo: 'py' },
                equipo2: { nombre: 'Turquía', abrev: 'TUR', codigo: 'tr' },
                hora: '23:00',
                estadio: 'BC Place', ciudad: 'Vancouver'
            }
        ]
    },

    // ─── MIÉRCOLES 24 DE JUNIO ───
    {
        dia: 'Miércoles 24 de Junio 2026',
        fecha: '2026-06-24',
        partidos: [
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Costa de Marfil', abrev: 'CIV', codigo: 'ci' },
                equipo2: { nombre: 'Curazao', abrev: 'CUW', codigo: 'cw' },
                hora: '14:00',
                estadio: 'Lincoln Financial Field', ciudad: 'Philadelphia'
            },
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'México', abrev: 'MEX', codigo: 'mx' },
                equipo2: { nombre: 'Rep. Checa', abrev: 'CZE', codigo: 'cz' },
                hora: '19:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Suecia', abrev: 'SWE', codigo: 'se' },
                equipo2: { nombre: 'Japón', abrev: 'JPN', codigo: 'jp' },
                hora: '17:00',
                estadio: 'Estadio BBVA', ciudad: 'Monterrey'
            },
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Alemania', abrev: 'GER', codigo: 'de' },
                equipo2: { nombre: 'Ecuador', abrev: 'ECU', codigo: 'ec' },
                hora: '20:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            }
        ]
    },

    // ─── JUEVES 25 DE JUNIO ───
    {
        dia: 'Jueves 25 de Junio 2026',
        fecha: '2026-06-25',
        partidos: [
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Egipto', abrev: 'EGY', codigo: 'eg' },
                equipo2: { nombre: 'Irán', abrev: 'IRN', codigo: 'ir' },
                hora: '14:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'España', abrev: 'ESP', codigo: 'es' },
                equipo2: { nombre: 'Uruguay', abrev: 'URU', codigo: 'uy' },
                hora: '17:00',
                estadio: 'Hard Rock Stadium', ciudad: 'Miami'
            },
            {
                grupo: 'Grupo G', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Bélgica', abrev: 'BEL', codigo: 'be' },
                equipo2: { nombre: 'Nueva Zelanda', abrev: 'NZL', codigo: 'nz' },
                hora: '20:00',
                estadio: 'Lumen Field', ciudad: 'Seattle'
            },
            {
                grupo: 'Grupo H', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Arabia Saudita', abrev: 'KSA', codigo: 'sa' },
                equipo2: { nombre: 'Cabo Verde', abrev: 'CPV', codigo: 'cv' },
                hora: '23:00',
                estadio: 'Mercedes-Benz Stadium', ciudad: 'Atlanta'
            }
        ]
    },

    // ─── VIERNES 26 DE JUNIO ───
    {
        dia: 'Viernes 26 de Junio 2026',
        fecha: '2026-06-26',
        partidos: [
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Francia', abrev: 'FRA', codigo: 'fr' },
                equipo2: { nombre: 'Noruega', abrev: 'NOR', codigo: 'no' },
                hora: '14:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo J', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Argentina', abrev: 'ARG', codigo: 'ar' },
                equipo2: { nombre: 'Jordania', abrev: 'JOR', codigo: 'jo' },
                hora: '17:00',
                estadio: 'Arrowhead Stadium', ciudad: 'Kansas City'
            },
            {
                grupo: 'Grupo I', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Senegal', abrev: 'SEN', codigo: 'sn' },
                equipo2: { nombre: 'Irak', abrev: 'IRQ', codigo: 'iq' },
                hora: '20:00',
                estadio: 'Gillette Stadium', ciudad: 'Foxborough'
            },
            {
                grupo: 'Grupo J', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Argelia', abrev: 'ALG', codigo: 'dz' },
                equipo2: { nombre: 'Austria', abrev: 'AUT', codigo: 'at' },
                hora: '23:00',
                estadio: "Levi's Stadium", ciudad: 'Santa Clara'
            }
        ]
    },

    // ─── SÁBADO 27 DE JUNIO ───
    {
        dia: 'Sábado 27 de Junio 2026',
        fecha: '2026-06-27',
        partidos: [
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Portugal', abrev: 'POR', codigo: 'pt' },
                equipo2: { nombre: 'Colombia', abrev: 'COL', codigo: 'co' },
                hora: '14:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Inglaterra', abrev: 'ENG', codigo: 'gb-eng' },
                equipo2: { nombre: 'Panamá', abrev: 'PAN', codigo: 'pa' },
                hora: '17:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo K', fase: 'Fase de Grupos',
                equipo1: { nombre: 'RD Congo', abrev: 'COD', codigo: 'cd' },
                equipo2: { nombre: 'Uzbekistán', abrev: 'UZB', codigo: 'uz' },
                hora: '20:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo L', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Croacia', abrev: 'CRO', codigo: 'hr' },
                equipo2: { nombre: 'Ghana', abrev: 'GHA', codigo: 'gh' },
                hora: '23:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            }
        ]
    },

    // ─── DOMINGO 28 DE JUNIO ───
    {
        dia: 'Domingo 28 de Junio 2026',
        fecha: '2026-06-28',
        partidos: [
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'México', abrev: 'MEX', codigo: 'mx' },
                equipo2: { nombre: 'Sudáfrica', abrev: 'RSA', codigo: 'za' },
                hora: '14:00',
                estadio: 'Estadio Azteca', ciudad: 'Ciudad de México'
            },
            {
                grupo: 'Grupo A', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Corea del Sur', abrev: 'KOR', codigo: 'kr' },
                equipo2: { nombre: 'Rep. Checa', abrev: 'CZE', codigo: 'cz' },
                hora: '14:00',
                estadio: 'Estadio Akron', ciudad: 'Guadalajara'
            },
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Canadá', abrev: 'CAN', codigo: 'ca' },
                equipo2: { nombre: 'Catar', abrev: 'QAT', codigo: 'qa' },
                hora: '20:00',
                estadio: 'BMO Field', ciudad: 'Toronto'
            },
            {
                grupo: 'Grupo B', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Bosnia y Herz.', abrev: 'BIH', codigo: 'ba' },
                equipo2: { nombre: 'Suiza', abrev: 'SUI', codigo: 'ch' },
                hora: '20:00',
                estadio: 'BC Place', ciudad: 'Vancouver'
            }
        ]
    },

    // ─── LUNES 29 DE JUNIO ───
    {
        dia: 'Lunes 29 de Junio 2026',
        fecha: '2026-06-29',
        partidos: [
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Brasil', abrev: 'BRA', codigo: 'br' },
                equipo2: { nombre: 'Haití', abrev: 'HAI', codigo: 'ht' },
                hora: '14:00',
                estadio: 'MetLife Stadium', ciudad: 'East Rutherford'
            },
            {
                grupo: 'Grupo C', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Marruecos', abrev: 'MAR', codigo: 'ma' },
                equipo2: { nombre: 'Escocia', abrev: 'SCO', codigo: 'gb-sct' },
                hora: '14:00',
                estadio: 'Gillette Stadium', ciudad: 'Foxborough'
            },
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Estados Unidos', abrev: 'USA', codigo: 'us' },
                equipo2: { nombre: 'Turquía', abrev: 'TUR', codigo: 'tr' },
                hora: '20:00',
                estadio: 'SoFi Stadium', ciudad: 'Inglewood'
            },
            {
                grupo: 'Grupo D', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Australia', abrev: 'AUS', codigo: 'au' },
                equipo2: { nombre: 'Paraguay', abrev: 'PAR', codigo: 'py' },
                hora: '20:00',
                estadio: 'BC Place', ciudad: 'Vancouver'
            }
        ]
    },

    // ─── MARTES 30 DE JUNIO ───
    {
        dia: 'Martes 30 de Junio 2026',
        fecha: '2026-06-30',
        partidos: [
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Alemania', abrev: 'GER', codigo: 'de' },
                equipo2: { nombre: 'Costa de Marfil', abrev: 'CIV', codigo: 'ci' },
                hora: '14:00',
                estadio: 'Lincoln Financial Field', ciudad: 'Philadelphia'
            },
            {
                grupo: 'Grupo E', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Ecuador', abrev: 'ECU', codigo: 'ec' },
                equipo2: { nombre: 'Curazao', abrev: 'CUW', codigo: 'cw' },
                hora: '14:00',
                estadio: 'NRG Stadium', ciudad: 'Houston'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Países Bajos', abrev: 'NED', codigo: 'nl' },
                equipo2: { nombre: 'Túnez', abrev: 'TUN', codigo: 'tn' },
                hora: '20:00',
                estadio: 'AT&T Stadium', ciudad: 'Dallas'
            },
            {
                grupo: 'Grupo F', fase: 'Fase de Grupos',
                equipo1: { nombre: 'Japón', abrev: 'JPN', codigo: 'jp' },
                equipo2: { nombre: 'Suecia', abrev: 'SWE', codigo: 'se' },
                hora: '20:00',
                estadio: 'Estadio BBVA', ciudad: 'Monterrey'
            }
        ]
    }
]