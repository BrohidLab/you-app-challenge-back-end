export function getZodiacAndHoroscope(birthday: Date): { zodiac: string; horoscope: string } {
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
        return { zodiac: 'Aries', horoscope: 'Ram' };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
        return { zodiac: 'Taurus', horoscope: 'Bull' };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 21))
        return { zodiac: 'Gemini', horoscope: 'Twins' };
    if ((month === 6 && day >= 22) || (month === 7 && day <= 22))
        return { zodiac: 'Cancer', horoscope: 'Crab' };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
        return { zodiac: 'Leo', horoscope: 'Lion' };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
        return { zodiac: 'Virgo', horoscope: 'Virgin' };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 23))
        return { zodiac: 'Libra', horoscope: 'Balance' };
    if ((month === 10 && day >= 24) || (month === 11 && day <= 21))
        return { zodiac: 'Scorpio', horoscope: 'Scorpion' };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
        return { zodiac: 'Sagittarius', horoscope: 'Archer' };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
        return { zodiac: 'Capricorn', horoscope: 'Goat' };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
        return { zodiac: 'Aquarius', horoscope: 'Water Bearer' };
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
        return { zodiac: 'Pisces', horoscope: 'Fish' };

    return { zodiac: '', horoscope: '' };
}
