import ServiceBase from 'base/service.base';

export default class UsersService extends ServiceBase {

    get languages() {
        return [
            {id: 'sq', name: 'Albanian (Shqip)'},
            {id: 'ar', name: 'Arabic (عربي)'},
            {id: 'az', name: 'Azerbaijani (Azeri)'},
            {id: 'eu', name: 'Basque (Euskara)'},
            {id: 'bs', name: 'Bosnian (Bosanski)'},
            {id: 'bg', name: 'Bulgarian (Български)'},
            {id: 'ca', name: 'Catalan (Català)'},
            {id: 'hr', name: 'Croatian (Hrvatski)'},
            {id: 'cs', name: 'Czech (Čeština)'},
            {id: 'da', name: 'Danish (Dansk)'},
            {id: 'nl', name: 'Dutch (Nederlands)'},
            {id: 'en', name: 'English'},
            {id: 'en-GB', name: 'English (British)'},
            {id: 'et', name: 'Estonian (Eesti)'},
            {id: 'fi', name: 'Finnish (Suomi)'},
            {id: 'fr', name: 'French (Français)'},
            {id: 'gl', name: 'Galician (Galego)'},
            {id: 'de', name: 'German (Deutsch)'},
            {id: 'el', name: 'Greek (Ελληνικά)'},
            {id: 'he', name: 'Hebrew (עברית)'},
            {id: 'hu', name: 'Hungarian (Magyar)'},
            {id: 'id', name: 'Indonesian (Bahasa Indonesia)'},
            {id: 'it', name: 'Italian (Italiano)'},
            {id: 'ja', name: 'Japanese (日本語)'},
            {id: 'ko', name: 'Korean (한국어)'},
            {id: 'lv', name: 'Latvian (Latviešu)'},
            {id: 'lt', name: 'Lithuanian (lietuvių)'},
            {id: 'mk', name: 'Macedonian (Македонски)'},
            {id: 'mn', name: 'Mongolian (Монгол)'},
            {id: 'no', name: 'Norwegian (Norsk bokmål)'},
            {id: 'fa', name: 'Persian (پارسی)'},
            {id: 'pl', name: 'Polish (Polski)'},
            {id: 'pt', name: 'Portuguese (Português)'},
            {id: 'pt-BR', name: 'Portuguese/Brasil (Português/Brasil)'},
            {id: 'ro', name: 'Romanian (Română)'},
            {id: 'ru', name: 'Russian (Русский)'},
            {id: 'sr-YU', name: 'Serbian (Srpski)'},
            {id: 'sr', name: 'Serbian Cyrillic (Српски)'},
            {id: 'zh', name: 'Simplified Chinese (简体中文)'},
            {id: 'sk', name: 'Slovak (Slovenčina)'},
            {id: 'sl', name: 'Slovene (Slovenščina)'},
            {id: 'es', name: 'Spanish (Español)'},
            {id: 'es-PA', name: 'Spanish/Panama (Español/Panamá)'},
            {id: 'sv', name: 'Swedish (Svenska)'},
            {id: 'th', name: 'Thai (ไทย)'},
            {id: 'zh-TW', name: 'Traditional Chinese (繁體中文)'},
            {id: 'tr', name: 'Turkish (Türkçe)'},
            {id: 'uk', name: 'Ukrainian (Українська)'},
            {id: 'vi', name: 'Vietnamese (Tiếng Việt)'}
        ];
    }

    get timeZone() {
        return [
            {value: 'American Samoa', name: '(GMT-11:00) American Samoa'},
            {value: 'International Date Line West', name: '(GMT-11:00) International Date Line West'},
            {value: 'Midway Island', name: '(GMT-11:00) Midway Island'},
            {value: 'Hawaii', name: '(GMT-10:00) Hawaii'},
            {value: 'Alaska', name: '(GMT-09:00) Alaska'},
            {value: 'Pacific Time (US &amp; Canada)', name: '(GMT-08:00) Pacific Time (US &amp;Canada)'},
            {value: 'Tijuana', name: '(GMT-08:00) Tijuana'},
            {value: 'Arizona', name: '(GMT-07:00) Arizona'},
            {value: 'Mazatlan', name: '(GMT-07:00) Mazatlan'},
            {value: 'Mountain Time (US &amp; Canada)', name: '(GMT-07:00) Mountain Time (US &amp; Canada)'},
            {value: 'Central America', name: '(GMT-06:00) Central America'},
            {value: 'Central Time (US &amp; Canada)', name: '(GMT-06:00) Central Time (US &amp;Canada)'},
            {value: 'Guadalajara', name: '(GMT-06:00) Guadalajara'},
            {value: 'Mexico City', name: '(GMT-06:00) Mexico City'},
            {value: 'Monterrey', name: '(GMT-06:00) Monterrey'},
            {value: 'Saskatchewan', name: '(GMT-06:00) Saskatchewan'},
            {value: 'Bogota', name: '(GMT-05:00) Bogota'},
            {value: 'Eastern Time (US &amp; Canada)', name: '(GMT-05:00) Eastern Time (US &amp;Canada)'},
            {value: 'Indiana (East)', name: '(GMT-05:00) Indiana (East)'},
            {value: 'Lima', name: '(GMT-05:00) Lima'},
            {value: 'Quito', name: '(GMT-05:00) Quito'},
            {value: 'Atlantic Time (Canada)', name: '(GMT-04:00) Atlantic Time (Canada)'},
            {value: 'Caracas', name: '(GMT-04:00) Caracas'},
            {value: 'Georgetown', name: '(GMT-04:00) Georgetown'},
            {value: 'La Paz', name: '(GMT-04:00) La Paz'},
            {value: 'Santiago', name: '(GMT-04:00) Santiago'},
            {value: 'Newfoundland', name: '(GMT-03:30) Newfoundland'},
            {value: 'Brasilia', name: '(GMT-03:00) Brasilia'},
            {value: 'Buenos Aires', name: '(GMT-03:00) Buenos Aires'},
            {value: 'Greenland', name: '(GMT-03:00) Greenland'},
            {value: 'Montevideo', name: '(GMT-03:00) Montevideo'},
            {value: 'Mid-Atlantic', name: '(GMT-02:00) Mid-Atlantic'},
            {value: 'Azores', name: '(GMT-01:00) Azores'},
            {value: 'Cape Verde Is.', name: '(GMT-01:00) Cape Verde Is.'},
            {value: 'Casablanca', name: '(GMT+00:00) Casablanca'},
            {value: 'Dublin', name: '(GMT+00:00) Dublin'},
            {value: 'Edinburgh', name: '(GMT+00:00) Edinburgh'},
            {value: 'Lisbon', name: '(GMT+00:00) Lisbon'},
            {value: 'London', name: '(GMT+00:00) London'},
            {value: 'Monrovia', name: '(GMT+00:00) Monrovia'},
            {value: 'UTC', name: '(GMT+00:00) UTC'},
            {value: 'Amsterdam', name: '(GMT+01:00) Amsterdam'},
            {value: 'Belgrade', name: '(GMT+01:00) Belgrade'},
            {value: 'Berlin', name: '(GMT+01:00) Berlin'},
            {value: 'Bern', name: '(GMT+01:00) Bern'},
            {value: 'Bratislava', name: '(GMT+01:00) Bratislava'},
            {value: 'Brussels', name: '(GMT+01:00) Brussels'},
            {value: 'Budapest', name: '(GMT+01:00) Budapest'},
            {value: 'Copenhagen', name: '(GMT+01:00) Copenhagen'},
            {value: 'Ljubljana', name: '(GMT+01:00) Ljubljana'},
            {value: 'Madrid', name: '(GMT+01:00) Madrid'},
            {value: 'Paris', name: '(GMT+01:00) Paris'},
            {value: 'Prague', name: '(GMT+01:00) Prague'},
            {value: 'Rome', name: '(GMT+01:00) Rome'},
            {value: 'Sarajevo', name: '(GMT+01:00) Sarajevo'},
            {value: 'Skopje', name: '(GMT+01:00) Skopje'},
            {value: 'Stockholm', name: '(GMT+01:00) Stockholm'},
            {value: 'Vienna', name: '(GMT+01:00) Vienna'},
            {value: 'Warsaw', name: '(GMT+01:00) Warsaw'},
            {value: 'West Central Africa', name: '(GMT+01:00) West Central Africa'},
            {value: 'Zagreb', name: '(GMT+01:00) Zagreb'},
            {value: 'Athens', name: '(GMT+02:00) Athens'},
            {value: 'Bucharest', name: '(GMT+02:00) Bucharest'},
            {value: 'Cairo', name: '(GMT+02:00) Cairo'},
            {value: 'Harare', name: '(GMT+02:00) Harare'},
            {value: 'Helsinki', name: '(GMT+02:00) Helsinki'},
            {value: 'Jerusalem', name: '(GMT+02:00) Jerusalem'},
            {value: 'Kaliningrad', name: '(GMT+02:00) Kaliningrad'},
            {value: 'Kyiv', name: '(GMT+02:00) Kyiv'},
            {value: 'Pretoria', name: '(GMT+02:00) Pretoria'},
            {value: 'Riga', name: '(GMT+02:00) Riga'},
            {value: 'Sofia', name: '(GMT+02:00) Sofia'},
            {value: 'Tallinn', name: '(GMT+02:00) Tallinn'},
            {value: 'Vilnius', name: '(GMT+02:00) Vilnius'},
            {value: 'Baghdad', name: '(GMT+03:00) Baghdad'},
            {value: 'Istanbul', name: '(GMT+03:00) Istanbul'},
            {value: 'Kuwait', name: '(GMT+03:00) Kuwait'},
            {value: 'Minsk', name: '(GMT+03:00) Minsk'},
            {value: 'Moscow', name: '(GMT+03:00) Moscow'},
            {value: 'Nairobi', name: '(GMT+03:00) Nairobi'},
            {value: 'Riyadh', name: '(GMT+03:00) Riyadh'},
            {value: 'St. Petersburg', name: '(GMT+03:00) St. Petersburg'},
            {value: 'Volgograd', name: '(GMT+03:00) Volgograd'},
            {value: 'Tehran', name: '(GMT+03:30) Tehran'},
            {value: 'Abu Dhabi', name: '(GMT+04:00) Abu Dhabi'},
            {value: 'Baku', name: '(GMT+04:00) Baku'},
            {value: 'Muscat', name: '(GMT+04:00) Muscat'},
            {value: 'Samara', name: '(GMT+04:00) Samara'},
            {value: 'Tbilisi', name: '(GMT+04:00) Tbilisi'},
            {value: 'Yerevan', name: '(GMT+04:00) Yerevan'},
            {value: 'Kabul', name: '(GMT+04:30) Kabul'},
            {value: 'Ekaterinburg', name: '(GMT+05:00) Ekaterinburg'},
            {value: 'Islamabad', name: '(GMT+05:00) Islamabad'},
            {value: 'Karachi', name: '(GMT+05:00) Karachi'},
            {value: 'Tashkent', name: '(GMT+05:00) Tashkent'},
            {value: 'Chennai', name: '(GMT+05:30) Chennai'},
            {value: 'Kolkata', name: '(GMT+05:30) Kolkata'},
            {value: 'Mumbai', name: '(GMT+05:30) Mumbai'},
            {value: 'New Delhi', name: '(GMT+05:30) New Delhi'},
            {value: 'Sri Jayawardenepura', name: '(GMT+05:30) Sri Jayawardenepura'},
            {value: 'Kathmandu', name: '(GMT+05:45) Kathmandu'},
            {value: 'Almaty', name: '(GMT+06:00) Almaty'},
            {value: 'Astana', name: '(GMT+06:00) Astana'},
            {value: 'Dhaka', name: '(GMT+06:00) Dhaka'},
            {value: 'Urumqi', name: '(GMT+06:00) Urumqi'},
            {value: 'Rangoon', name: '(GMT+06:30) Rangoon'},
            {value: 'Bangkok', name: '(GMT+07:00) Bangkok'},
            {value: 'Hanoi', name: '(GMT+07:00) Hanoi'},
            {value: 'Jakarta', name: '(GMT+07:00) Jakarta'},
            {value: 'Krasnoyarsk', name: '(GMT+07:00) Krasnoyarsk'},
            {value: 'Novosibirsk', name: '(GMT+07:00) Novosibirsk'},
            {value: 'Beijing', name: '(GMT+08:00) Beijing'},
            {value: 'Chongqing', name: '(GMT+08:00) Chongqing'},
            {value: 'Hong Kong', name: '(GMT+08:00) Hong Kong'},
            {value: 'Irkutsk', name: '(GMT+08:00) Irkutsk'},
            {value: 'Kuala Lumpur', name: '(GMT+08:00) Kuala Lumpur'},
            {value: 'Perth', name: '(GMT+08:00) Perth'},
            {value: 'Singapore', name: '(GMT+08:00) Singapore'},
            {value: 'Taipei', name: '(GMT+08:00) Taipei'},
            {value: 'Ulaanbaatar', name: '(GMT+08:00) Ulaanbaatar'},
            {value: 'Osaka', name: '(GMT+09:00) Osaka'},
            {value: 'Sapporo', name: '(GMT+09:00) Sapporo'},
            {value: 'Seoul', name: '(GMT+09:00) Seoul'},
            {value: 'Tokyo', name: '(GMT+09:00) Tokyo'},
            {value: 'Yakutsk', name: '(GMT+09:00) Yakutsk'},
            {value: 'Adelaide', name: '(GMT+09:30) Adelaide'},
            {value: 'Darwin', name: '(GMT+09:30) Darwin'},
            {value: 'Brisbane', name: '(GMT+10:00) Brisbane'},
            {value: 'Canberra', name: '(GMT+10:00) Canberra'},
            {value: 'Guam', name: '(GMT+10:00) Guam'},
            {value: 'Hobart', name: '(GMT+10:00) Hobart'},
            {value: 'Melbourne', name: '(GMT+10:00) Melbourne'},
            {value: 'Port Moresby', name: '(GMT+10:00) Port Moresby'},
            {value: 'Sydney', name: '(GMT+10:00) Sydney'},
            {value: 'Vladivostok', name: '(GMT+10:00) Vladivostok'},
            {value: 'Magadan', name: '(GMT+11:00) Magadan'},
            {value: 'New Caledonia', name: '(GMT+11:00) New Caledonia'},
            {value: 'Solomon Is.', name: '(GMT+11:00) Solomon Is.'},
            {value: 'Srednekolymsk', name: '(GMT+11:00) Srednekolymsk'},
            {value: 'Auckland', name: '(GMT+12:00) Auckland'},
            {value: 'Fiji', name: '(GMT+12:00) Fiji'},
            {value: 'Kamchatka', name: '(GMT+12:00) Kamchatka'},
            {value: 'Marshall Is.', name: '(GMT+12:00) Marshall Is.'},
            {value: 'Wellington', name: '(GMT+12:00) Wellington'},
            {value: 'Chatham Is.', name: '(GMT+12:45) Chatham Is.'},
            {value: 'Nuku`alofa', name: '(GMT+13:00) Nuku`alofa'},
            {value: 'Samoa', name: '(GMT+13:00) Samoa'},
            {value: 'Tokelau Is.', name: '(GMT+13:00) Tokelau Is.'},
        ];
    }

    get notifications() {
        return [
            {value: 'all', name: 'For any event on all my projects'},
            {value: 'selected', name: 'For any event on the selected projects only...'},
            {value: 'only_my_events', name: 'Only for things I watch or I\'m involved in', selected: true},
            {value: 'only_assigned', name: 'Only for things I am assigned to'},
            {value: 'only_owner', name: 'Only for things I am the owner of'},
            {value: 'none', name: 'No events'}
        ];
    }

    static get $inject() {
        return ['$http'];
    }

    $onInit($injector) {
    }

    one(id) {
        return this.$http.get(`/api/v1/users/${id}`);
    }

    all() {
        return this.$http.get(`api/v1/users`);
    }

    updateUserStatus(id, params) {
        // return this.Restangular.one('users', id).customPUT(params, 'updatestatus');
    }

    deleteUser(id){
        // return this.Restangular.one('users', id).remove();
    }

    getUserInfo() {
        // return this.Restangular.one('my').one('account').withHttpConfig({cache: this.cache}).get().then((response) => {
        //     response.data.hide_mail = !!response.data.hide_mail;
        //     response.data.no_self_notified = !!response.data.no_self_notified;
        //     response.data.warn_on_leaving_unsaved = !!response.data.warn_on_leaving_unsaved;
        //
        //     return response;
        // });
    }

    getApiAccessKey() {
        // return this.Restangular.one('my').one('api-key').get();
    }

    update(user) {
        // return this.Restangular.all('users').customPUT(user, user.id);
    }

    // resetApiAccessKey() {
        // return this.Restangular.one('my').one('api-key').put();
    // }

    // resetAtomAccessKey() {
        // return this.Restangular.one('my').one('rss-key').put();
    // }

    // getAdditionalEmails() {
        // return this.Restangular.all('my').one('email-addresses').getList();
    // }

    // updateAdditionalEmail(emailAddressId, data) {
        // return this.Restangular.one('my', 'email-addresses').customPUT(data, emailAddressId);
    // }

    // deleteAdditionalEmail(emailAddressId) {
        // return this.Restangular.one('my').one('email-addresses', emailAddressId).remove();
    // }

    // addAdditionalEmail(email) {
        // return this.Restangular.one('my').all('email-addresses').post({
        //     email: email,
        //     is_default: false,
        //     notify: true
        // });
    // }

    // changePassword(data) {
        // return this.Restangular.one('my').customPUT(data, 'password');
    // }

}