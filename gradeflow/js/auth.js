const Auth={async hash(p,salt){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(p),'PBKDF2',false,['deriveBits']);
 const b=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:150000,hash:'SHA-256'},k,256);
 return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')},
 async register(f){const salt=uid()+uid();db.profile={name:f.name,school:f.school,grade:f.grade,klass:f.klass,year:f.year,user:f.user,salt,hash:await this.hash(f.pass,salt)};Store.save()},
 async check(u,p){return db.profile&&db.profile.user===u&&db.profile.hash===await this.hash(p,db.profile.salt)}};
