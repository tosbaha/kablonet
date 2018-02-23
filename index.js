const rp = require('request-promise');

class Kablonet {
    constructor() {
        this.baseUrl = 'https://m.turksatkablo.com.tr'
        this.key = null;
    }

    /**
     * Get Kablonet Service with URL 
     * @param {String} serviceUrl Kablonet Endpoint
     */
    async getKablonetService(serviceUrl) {
        if (!this.key) {
            throw new Error('Login first');
        }
        const endpoint = this.baseUrl + serviceUrl;
        const options = {
            uri: endpoint,
            gzip:true,
            headers: {
                'key': this.key,
                'Accept': '*/*',
                'Accept-Language': 'tr-tr',
                'User-Agent': 'Kablo/2.0.5 CFNetwork/889.9 Darwin/17.2.0'
            },
            body: "",
            json: true
        };

        const response = await rp.post(options);
        return response;
    }

    /**
     * Login with musterino and password
     * Password is **NOT** a plaintext password. It is MD5 of real password.
     * @param{String} musterino Musteri No
     * @param{String} sifre Password
     */
    async loginWithMusteriNo(musterino,sifre) {

        const endpoint = this.baseUrl + '/KullaniciService.svc/sorgulaKullaniciGiris/' + musterino

        const options = {
            uri: endpoint,
            gzip:true,
            headers: {
                'sifre': sifre,
                'Accept': '*/*',
                'secim': 'musteriID',
                'Accept-Language': 'tr-tr',
                'User-Agent': 'Kablo/2.0.5 CFNetwork/889.9 Darwin/17.2.0'
            },
            json: true
        };
        
        const response = await rp.post(options);
        const authKey = response.sonucMusteriAuth[0].sonucKod;
        //Kablonet uses String for sonucKod  ¯\_(ツ)_/¯ 
        if ( authKey === '0') {
            this.key = response.sonucMusteriAuth[0].sonucKey;
        } else {
            throw new Error('Kablonet Giris Hatasi.');
        }
        return response;
    }

    /** 
     * Kota
     * @returns {Promise.<Object>}
    */
    async getKota() {
        const response = await this.getKablonetService('/KullaniciService.svc/sorgFaturaKota');
        return response;
    }

    /** 
     * Donem Kota
     * @returns {Promise.<Object>}
    */
    async getKotaDonem() {
        const response = await this.getKablonetService('/KullaniciService.svc/sorgMusteriKotaDonem');
        return response;
    }
    
    /** 
     * Borc
     * @returns {Promise.<Object>}
    */
    async getBorc() {
        const response = await this.getKablonetService('/KullaniciService.svc/sorgAnlikBorc')
        return response;
    }

    /** 
     * Hizmetler
     * @returns {Promise.<Object>}
    */
    async getHizmetler() {
        const response = await this.getKablonetService('/KullaniciService.svc/sorgMevcutHizmetler')
        return response;
    }
    
    /** 
     * Kampanyalar
     * @returns {Promise.<Object>}
    */
    async getKampanyalar() {
        const response = await this.getKablonetService('/KullaniciService.svc/sorgKampanyaBilgileri')
        return response;
    }

}

module.exports = Kablonet;