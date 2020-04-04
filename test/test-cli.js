const path = require('path')
const bin = path.resolve(__dirname, '../bin/kablonet');
const should = require('should');
const spawn = require('child_process').spawn
const Configstore = require('configstore');
const configname = 'testkablonetconfig';
const conf = new Configstore(configname);
const yakbak = require('yakbak');
const http = require('http');
const proxyPort = 7000;

describe('Kablonet CLI Test',function(){
    const server = http.createServer(yakbak('https://m.turksatkablo.com.tr', {
        dirname: __dirname + "/tapes",
    }));

    before (function (done) {
        server.listen(proxyPort);
        done();
    });

    after (function (done) {
        server.close();
        done();
    });

    this.timeout(600000); //Slow API 
    const musterino = '1234567';
    const password = '11111111111111111111111111111111';
    //Set the values because it is hard to test inquirer
    conf.set('musterino',musterino)
    conf.set('sifre',password)


    const env = {
        musterino: musterino,
        password: password,
        configname: configname,
        mockurl: 'http://localhost:' + String(proxyPort)
    }

    it('should get values from environment',function() {
        should(musterino).be.String();
        should(password).be.String();
        password.length.should.be.eql(32,'MD5 Hash must be equal to 32');
    });

    it('should spawn the binary',function(done) {
        const args = [bin,'help']
        const proc = spawn(process.execPath, args, {
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
            stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Usage: kablonet/)
            done()
        });
    });

    it('should get the kota',function(done) {
        const args = [bin, 'kota']
        const proc = spawn(process.execPath, args, {
            env: env
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
          stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Kota Sonucu/)
            done()
        });
    });

    it('should get the kotadonem',function(done) {
        const args = [bin, 'kotadonem']
        const proc = spawn(process.execPath, args, {
            env: env
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
          stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Aylık Kota Sonucu/)
            stdout.should.match(/Günlük Kota Sonucu/)
            done()
        });
    });

    it('should get the borc',function(done) {
        const args = [bin, 'borc']
        const proc = spawn(process.execPath, args, {
            env: env
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
          stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Borç Sonucu/)
            stdout.should.match(/Hizmet No/)
            stdout.should.match(/Anlık Borç/)
            done()
        });
    });

    it('should get the hizmetler',function(done) {
        const args = [bin, 'hizmet']
        const proc = spawn(process.execPath, args, {
            env: env
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
          stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Hizmet Sonucu/)
            stdout.should.match(/Hizmet Durumu/)
            stdout.should.match(/Hizmet No/)
            done()
        });
    });

    it('should get the kampanyalar',function(done) {
        const args = [bin, 'kampanya']
        const proc = spawn(process.execPath, args, {
            env: env
        })

        let stdout = ''
        proc.stdout.on('data', function (chunk) {
          stdout += chunk
        })
  
        proc.on('close', function (code) {
            code.should.equal(0)
            stdout.should.match(/Kampanya Sonucu/)
            stdout.should.match(/Kampanya Adı/)
            stdout.should.match(/Taahhüt Başlangıç/)
            done()
        });
    });
})
