
const should = require('should');
require('dotenv').config();
const Kablonet = require('../');

describe('Kablonet LIVE API Test',function() {
    this.timeout(10000); //Slow API 
    const kablonet = new Kablonet();
    const musterino = process.env.musterino;
    const password = process.env.password;

    it('should get values from environment',function() {
        should(musterino).be.String();
        should(password).be.String();
        password.length.should.be.eql(32,'MD5 Hash must be equal to 32');
    });

    it('should not get any service without a key',async function(){
        await kablonet.getKota().should.be.rejectedWith('Login first');
    });

    it('should not login with wrong credentials',async function(){
        await kablonet.loginWithMusteriNo('WRONG','WRONG').should.be.rejectedWith('Kablonet Giris Hatasi.');
    });

    it('should login',async function() {
        const result = await kablonet.loginWithMusteriNo(musterino,password);
        result.sonucMusteriAuth.should.be.Array();
        result.sonucMusteriAuth.should.not.be.empty();
        String(result.sonucMusteriAuth[0].MusteriID).should.be.eql(musterino);
        result.sonucMusteriAuth[0].sonucKod.should.be.eql('0');
    });

    it('should get kota',async function() {
        const result = await kablonet.getKota();
        result.sonucKota.should.be.Array();
        result.sonucKota.should.not.be.empty();
        result.sonucKota[0].sonucKod.should.be.eql('0');
    });

    it('should get borc',async function() {
        const result = await kablonet.getBorc();
        result.sonucAnlikBorc.should.be.Array();
        result.sonucAnlikBorc.should.not.be.empty();
        result.sonucAnlikBorc[0].sonucKod.should.be.eql('0');
    });

    it('should get hizmetler',async function() {
        const result = await kablonet.getHizmetler();
        result.sonucMevcutHizmetler.should.be.Array();
        result.sonucMevcutHizmetler.should.not.be.empty();
        result.sonucMevcutHizmetler[0].hizmetDurum.should.be.String();
        result.sonucMevcutHizmetler[0].hizmetID.should.be.Number();
        result.sonucMevcutHizmetler[0].hizmetNo.should.be.String();
        result.sonucMevcutHizmetler[0].hizmetTuru.should.be.String();
        result.sonucMesaj[0].sonucKod.should.be.eql('0');
    });

    it('should get kampanyalar',async function() {
        const result = await kablonet.getKampanyalar();
        result.sonucKampanyaBilgileri.should.be.Array();
        result.sonucKampanyaBilgileri.should.not.be.empty();
        result.sonucKampanyaBilgileri[0].hizmetID.should.be.Number();
        result.sonucKampanyaBilgileri[0].hizmetNo.should.be.String();
        result.sonucKampanyaBilgileri[0].taahhutBaslangicTarihi.should.be.String();
        result.sonucKampanyaBilgileri[0].taahhutBedeli.should.be.Number();
        result.sonucKampanyaBilgileri[0].taahhutBitisTarihi.should.be.String();
        result.sonucMesaj[0].sonucKod.should.be.eql('0');
    });

    it('should get detayli koya',async function() {
        const result = await kablonet.getKotaDonem();
        result.sonucMusteriKotaHizmetID.should.be.Array();
        result.sonucMusteriKotaHizmetID.should.not.be.empty();
        //Donem
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem.should.be.Array();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem.should.not.be.empty();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].donem.should.be.String();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].downloadKullanim.should.be.String();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].uploadKullanim.should.be.String();
        //Gunluk
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].sonucKotaGunlukKullanim.should.be.Array();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].sonucKotaGunlukKullanim.should.not.be.empty();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].sonucKotaGunlukKullanim[0].DownloadGB.should.be.String();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].sonucKotaGunlukKullanim[0].UploadGB.should.be.String();
        result.sonucMusteriKotaHizmetID[0].sonucMusteriKotaDonem[0].sonucKotaGunlukKullanim[0].tarih.should.be.String();
        //Sonuc
        result.sonucMesaj[0].sonucKod.should.be.eql('0');
    });

});