const fs = require('fs'); // bibliotheque pour manipuler les fichier
//input
const message  = fs.readFileSync('message','utf-8'); // lire le fichier message format utf8
//ecrire le message a crypter dans le fichier  message.txt
const CODE_CESAR = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
// split chaine caractere par rapport lespace et le mettre dans un array exemple  split de "a,bb,ccc" par rapport ',' = [a,bb,ccc]
const BLOCK_LENGTH = 5;// longeur bloc cesar ntez bien qu il doit etre le meme taillle dans cryptage et decryptage
//genrate clefs automatiquement
const clefs = [];
for(let i = 0;i<BLOCK_LENGTH;i++){
    clefs.push(Math.round(Math.random()*26));
}
fs.writeFileSync('.env',clefs.join(',')); //ecrires le clef dans .env

//remove special char
const trunc_special_char = (m = "") => {
    return m.toLowerCase()
        .replace(/[éè]/g,'e') // regex tout é et è seront remplacer par e
        .replace(/ç/g,'c')// regex tout ç seront remplacer par c
        .replace(/à/g,'a') // regex tout à seront remplacer par a
        .replace(/ô/g,'o')// regex tout ô seront remplacer par o
        .split(' ')
        .map((item)=>item.replace(/\W+/,''))// regex supprimer all not word dans le tableau
        .join(' ')// transferer le tableau en une chaine de caractere avec un espace entre les element de tableau
        .toUpperCase(); // majuscule de toute la chaine
}
//translate chars with algo_vigenere (la fonction de cryptage de chaque caractere )
const translate_char = (char = '',n = 0) => {
    return CODE_CESAR[( CODE_CESAR.indexOf(char[0]) + n ) % 26];
}

const encrypt_veg =(m = "")=>{
    const map = trunc_special_char(m)
        .split(' ').map((item)=>item.length); 
    
        //remove special caractere et mettre le longuer de chaque bloc dans un tableau pour avoir la premiere structure de message a crypte 
        fs.writeFileSync('words.json',JSON.stringify(map)); //ecrire ces un info dans un fichier words.json
   
         //const clefs = [3,14,7,22,19];
        // on peut tester avec ces clefs l exemple de cours decommenter le ligne38 pour tester
    const regex = new RegExp(`\\w{1,${BLOCK_LENGTH}}`,'g'); // regex expression de word sur taille de block chiffre
    const block = 
    trunc_special_char(m)
        .split(' ') // deviser le message en un tableau par rapport au espace
        .join('') // le reconvertir en chaine sans espace
        .match(regex) // deviser en block de 5 et le mettre dans un tbleau
        .map((item,index,arr)=>{
            if(arr.length-1 === index){
                
                if(item.length < BLOCK_LENGTH){
                    for(let i = item.length;i<BLOCK_LENGTH;i++){
                        item += 'X';
                        
                    }
                    return item;
                }else{
                    return item;
                }
            }else{
                return item;
            }
        })// si dernier block est inferier a longuer de block ajouter des X
        .map((item)=>item.split('').map((item,index)=>translate_char(item,clefs[index])).join('')).join('');
        // crypter chaque caractere et le retourner dans une chaine qui s appele block
    
    var arr = [];
    var length_sum = 0;
    for(let i = 0;i<map.length;i++){
        if(i == map.length - 1 ){
            arr.push(block.slice(length_sum,block.length))// l ajout de dernier element de la chaine block dans arr
        }else{
            arr.push(block.slice(length_sum,length_sum + map[i]))// ajouter au tableau arr des element de la chaine block decouper avec longuer enregistrer dans map
        }
        length_sum += map[i];//longeur total de message crypter
    }
    return arr.join(' ');// joindre les elemet de tableau separer par espace
}

const crypted_message = encrypt_veg(message);
console.log(crypted_message);//output
fs.writeFileSync('crypted_message',crypted_message);// ecrire dans le fichier crypted message