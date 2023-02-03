const fs = require('fs');  // bibliotheque pour manipuler les fichier
const message  = fs.readFileSync('crypted_message','utf-8'); // lire le fichier crypted_message format utf8
const CODE_CESAR = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ');
// split chaine caractere par rapport lespace et le mettre dans un array exemple  split de "a,bb,ccc" par rapport ',' = [a,bb,ccc]
const BLOCK_LENGTH = 5; // longeur bloc cesar amodifier selon comment le message est crypter
const clefs_text  = fs.readFileSync('.env','utf-8').toString();// lires les clefs dans .env sont les clef utiliser dans le cryptage
const clefs=clefs_text.split(',')// mettre les clef dans un array exemple 6,19,1,9,7 = [ '6', '19', '1', '9', '7' ]
const translate_char = (char = '',n = 0) => {
    return CODE_CESAR[(( CODE_CESAR.indexOf(char[0]) - n ) %26 ) >0? (( CODE_CESAR.indexOf(char[0]) - n ) %26 ) : (( CODE_CESAR.indexOf(char[0]) - n +26 ) %26 )];
}// decryptage de chaque char selon lalgorythme

const decrypt_veg =(m = "")=>{//fonction de decryptagge
    const map = m
        .split(' ').map((item)=>item.length);       
         // mettre le longuer de chaque bloc dans un tableau 

    // const clefs = [3,14,7,22,19];
    const block = m.split(' ').join('').split('')//supprimer les espace du message et les decouper en un taleau de un seul caractere
    .map((item,index)=>item.split('').map((item)=>translate_char(item,clefs[index%BLOCK_LENGTH]))//decrypter avec la fonction decryptage de chaque char selon lalgorythme(translate_char)
    .join('')).join('');// retourner le message crypter en une chaine sans espace (un seul block)
    var arr = [];
    var length_sum = 0;
    for(let i = 0;i<map.length;i++){// lajout des espace dans les vrai position 
        if(i == map.length - 1 ){
            arr.push(block.slice(length_sum,block.length))// l ajout de dernier element de la chaine block dans arr
        }else{
            arr.push(block.slice(length_sum,length_sum + map[i]))// ajouter au tableau arr des element de la chaine block decouper avec longuer enregistrer dans map
        }
        length_sum += map[i];//longeur total
    }
    return arr.slice(0,-1).join(' ');//supprission du dernier element et rtourner une chaine

}

const decrypted_message = decrypt_veg(message);
console.log(decrypted_message);
//output
fs.writeFileSync('decrypted_message',decrypted_message);
