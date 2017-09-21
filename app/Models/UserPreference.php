<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    /**
     * Others field symbol in serialize data
     */
    const OTHERS_FIELD_SYMBOL = ':';

    /**
     * Default others data for serialize data
     */
    const DEFAULT_OTHERS_DATA = [
        'no_self_notified' => 1,
        'comments_sorting' => 'asc',
        'warn_on_leaving_unsaved' => 1
    ];

    const TIME_ZONE_MAP = [
        'American Samoa' => 'US/Samoa',
        'International Date Line West' => 'Etc/GMT-12',
        'Midway Island' => 'Pacific/Midway',
        'Hawaii' => 'US/Hawaii',
        'Alaska' => 'US/Alaska',
        'Pacific Time (US &amp; Canada)' => 'US/Pacific',
        'Tijuana' => 'America/Tijuana',
        'Arizona' => 'US/Arizona',
        'Mazatlan' => 'America/Mazatlan',
        'Mountain Time (US &amp; Canada)' => 'US/Mountain',
        'Central America' => 'America/Managua',
        'Central Time (US &amp; Canada)' => 'America/Chicago',
        'Guadalajara' => 'America/Mexico_City',
        'Mexico City' => 'America/Mexico_City',
        'Monterrey' => 'America/Monterrey',
        'Saskatchewan' => 'Canada/Saskatchewan',
        'Bogota' => 'America/Bogota',
        'Eastern Time (US &amp; Canada)' => 'US/Eastern',
        'Indiana (East)' => 'US/East-Indiana',
        'Lima' => 'America/Lima',
        'Quito' => 'America/Bogota',
        'Atlantic Time (Canada)' => 'Canada/Atlantic',
        'Caracas' => 'America/Caracas',
        'Georgetown' => 'America/Argentina/Buenos_Aires',
        'La Paz' => 'America/La_Paz',
        'Santiago' => 'America/Santiago',
        'Newfoundland' => 'Canada/Newfoundland',
        'Brasilia' => 'America/Sao_Paulo',
        'Buenos Aires' => 'America/Buenos_Aires',
        'Greenland' => 'Greenland',
        'Montevideo' => 'America/Montevideo',
        'Mid-Atlantic' => 'America/Noronha',
        'Azores' => 'Atlantic/Azores',
        'Cape Verde Is.' => 'Atlantic/Cape_Verde',
        'Casablanca' => 'Africa/Casablanca',
        'Dublin' => 'Europe/Dublin',
        'Edinburgh' => 'Europe/London',
        'Lisbon' => 'Europe/Lisbon',
        'London' => 'Europe/London',
        'Monrovia' => 'Africa/Monrovia',
        'UTC' => 'UTC',
        'Amsterdam' => 'Europe/Amsterdam',
        'Belgrade' => 'Europe/Belgrade',
        'Berlin' => 'Europe/Berlin',
        'Bern' => 'Europe/Berlin',
        'Bratislava' => 'Europe/Bratislava',
        'Brussels' => 'Europe/Brussels',
        'Budapest' => 'Europe/Budapest',
        'Copenhagen' => 'Europe/Copenhagen',
        'Ljubljana' => 'Europe/Ljubljana',
        'Madrid' => 'Europe/Madrid',
        'Paris' => 'Europe/Paris',
        'Prague' => 'Europe/Prague',
        'Rome' => 'Europe/Rome',
        'Sarajevo' => 'Europe/Sarajevo',
        'Skopje' => 'Europe/Skopje',
        'Stockholm' => 'Europe/Stockholm',
        'Vienna' => 'Europe/Vienna',
        'Warsaw' => 'Europe/Warsaw',
        'West Central Africa' => 'Africa/Lagos',
        'Zagreb' => 'Europe/Zagreb',
        'Athens' => 'Europe/Athens',
        'Bucharest' => 'Europe/Bucharest',
        'Cairo' => 'Africa/Cairo',
        'Harare' => 'Africa/Harare',
        'Helsinki' => 'Europe/Helsinki',
        'Jerusalem' => 'Asia/Jerusalem',
        'Kaliningrad' => 'Europe/Kaliningrad',
        'Kyiv' => 'Europe/Kiev',
        'Pretoria' => 'Africa/Johannesburg',
        'Riga' => 'Europe/Riga',
        'Sofia' => 'Europe/Sofia',
        'Tallinn' => 'Europe/Tallinn',
        'Vilnius' => 'Europe/Vilnius',
        'Baghdad' => 'Asia/Baghdad',
        'Istanbul' => 'Europe/Istanbul',
        'Kuwait' => 'Asia/Kuwait',
        'Minsk' => 'Europe/Minsk',
        'Moscow' => 'Europe/Moscow',
        'Nairobi' => 'Africa/Nairobi',
        'Riyadh' => 'Asia/Riyadh',
        'St. Petersburg' => 'Europe/Moscow',
        'Volgograd' => 'Europe/Volgograd',
        'Tehran' => 'Asia/Tehran',
        'Abu Dhabi' => 'Asia/Muscat',
        'Baku' => 'Asia/Baku',
        'Muscat' => 'Asia/Muscat',
        'Samara' => 'Europe/Samara',
        'Tbilisi' => 'Asia/Tbilisi',
        'Yerevan' => 'Asia/Yerevan',
        'Kabul' => 'Asia/Kabul',
        'Ekaterinburg' => 'Asia/Yekaterinburg',
        'Islamabad' => 'Asia/Karachi',
        'Karachi' => 'Asia/Karachi',
        'Tashkent' => 'Asia/Tashkent',
        'Chennai' => 'Asia/Calcutta',
        'Kolkata' => 'Asia/Calcutta',
        'Mumbai' => 'Asia/Calcutta',
        'New Delhi' => 'Asia/Calcutta',
        'Sri Jayawardenepura' => 'Asia/Colombo',
        'Kathmandu' => 'Asia/Kathmandu',
        'Almaty' => 'Asia/Almaty',
        'Astana' => 'Asia/Dhaka',
        'Dhaka' => 'Asia/Dhaka',
        'Urumqi' => 'Asia/Urumqi',
        'Rangoon' => 'Asia/Rangoon',
        'Bangkok' => 'Asia/Bangkok',
        'Hanoi' => 'Asia/Bangkok',
        'Jakarta' => 'Asia/Jakarta',
        'Krasnoyarsk' => 'Asia/Krasnoyarsk',
        'Novosibirsk' => 'Asia/Novosibirsk',
        'Beijing' => 'Asia/Hong_Kong',
        'Chongqing' => 'Asia/Chongqing',
        'Hong Kong' => 'Asia/Hong_Kong',
        'Irkutsk' => 'Asia/Irkutsk',
        'Kuala Lumpur' => 'Asia/Kuala_Lumpur',
        'Perth' => 'Australia/Perth',
        'Singapore' => 'Asia/Singapore',
        'Taipei' => 'Asia/Taipei',
        'Ulaanbaatar' => 'Asia/Ulaanbaatar',
        'Osaka' => 'Asia/Tokyo',
        'Sapporo' => 'Asia/Tokyo',
        'Seoul' => 'Asia/Seoul',
        'Tokyo' => 'Asia/Tokyo',
        'Yakutsk' => 'Asia/Yakutsk',
        'Adelaide' => 'Australia/Adelaide',
        'Darwin' => 'Australia/Darwin',
        'Brisbane' => 'Australia/Brisbane',
        'Canberra' => 'Australia/Canberra',
        'Guam' => 'Pacific/Guam',
        'Hobart' => 'Australia/Hobart',
        'Melbourne' => 'Australia/Melbourne',
        'Port Moresby' => 'Pacific/Port_Moresby',
        'Sydney' => 'Australia/Sydney',
        'Vladivostok' => 'Asia/Vladivostok',
        'Magadan' => 'Asia/Magadan',
        'New Caledonia' => 'Asia/Magadan',
        'Solomon Is.' => 'Asia/Magadan',
        'Srednekolymsk' => 'Asia/Srednekolymsk',
        'Auckland' => 'Pacific/Auckland',
        'Fiji' => 'Pacific/Fiji',
        'Kamchatka' => 'Pacific/Fiji',
        'Marshall Is.' => 'Pacific/Fiji',
        'Wellington' => 'Pacific/Auckland',
        'Chatham Is.' => 'Pacific/Chatham',
        'Nuku`alofa' => 'Pacific/Tongatapu',
        'Samoa' => 'Pacific/Apia',
        'Tokelau Is.' => 'Pacific/Auckland'
    ];

    protected $table = 'user_preferences';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];

    public function getOthersAttribute($value)
    {
        $others = yaml_parse($value);
        $result_others = [];

        foreach ($others as $key => $other) {
            $result_others[str_replace(self::OTHERS_FIELD_SYMBOL, '', $key)] = $other;
        }

        return $result_others;
    }

    /**
     * Update others
     *
     * This method updates the others field generate valid serialize string
     *
     * @param UserPreference $preference
     * @param array $others
     * @return bool
     */
    public static function updateOthers(UserPreference $preference, array $others = self::DEFAULT_OTHERS_DATA)
    {
        $update_others = [];

        foreach ($others as $key => $other) {
            $update_others[self::OTHERS_FIELD_SYMBOL . $key] = $other;
        }

        return $preference->update([
            'others' => yaml_emit($others)
        ]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
