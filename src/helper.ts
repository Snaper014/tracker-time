import { Trackers } from "./type";
/**
 * groupe en fonction d'une proprieté par
 * exemple si on veut grouper par category
 * groupBy(array,'category')
 * 
 * [{name: "mike", category:"sport"},
 * {name: "mike", category:"sport"},
 * {name: "mike", category:"perso"}]
 * donnera
 * {
 *  'sport':[...],
 *  'perso':[...]
 * }
 * @param {*} tableauObjets 
 * @param {*} propriete 
 * @returns 
 */
export function groupBy(tableauObjets: Trackers[], propriete: keyof Trackers){
    return tableauObjets.reduce(function (acc, obj) {
      var cle = obj[propriete] as string;
      if (!acc[cle]) {
        acc[cle] = [];
      }
      acc[cle].push(obj);
      return acc;
    }, {} as Record<string, Trackers[]>);
  }
  
  
  export const diffTime = (start: string, end: string) => {
  
    // objectif ! difference entre 2 dates : 
    // avoir une chaine de caracteres qui affiche : Days : Heures : Minutes : secondes : Milliseconde
    // algo ! on faire faire la difference en ms : calculer les jours, sourstraire, les heures + sourstraires etc ...tracker
  
    //1 : date de depart et date de fin (date de fin peut etre undefined = now)
    //2 : calcul delta diff /1000 pour avoir en seconde
    //3 : calcul nb days : delta/ 86400 : nombre de seconde / 86400 (seconde dans days) pour avoir le nombre de days 
    //4 : calcul nb heures  :delta / 3600 : nombre de seconde restante / 3600 pour avoir le nombre d'heures restantes
    //5 : calcul nb minutes  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes 
    //6 : calcul nb sec  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes 
    
    let Newstart = new Date(start).getTime();
    let NewEnd = end ?  new Date(end).getTime(): new Date().getTime();
    
    let durationStr = ""
    
    var delta = Math.abs(Newstart - NewEnd ) / 1000;
  
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
  
    if (days > 0) {
      durationStr = days + " j "
    }
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
  
    if (hours > 0) {
      durationStr +=  hours + " h "
    }
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;

    if (minutes > 0) {
      durationStr += minutes + " min "
    }
    // what's left is seconds
    var seconds = Math.floor(delta % 60)
    if (seconds > 0) {
      durationStr += seconds + " sec "
    }

    return durationStr
  }
  
  export const getDateTimeForPicker = (date = new Date()) => {
    const dateIso = date.toISOString();
    return dateIso.substring(0, dateIso.length - 5)
  }

  export const GeneratorID = () => {
      const letter = 'abcdefghijklmnopqrstuvwxyz';
      let id = "";
      for(let i=0; i <= letter.length ; i++){
        if(i %2 === 0){
          id += 
          letter.charAt(Math.floor(Math.random() * letter.length)).toUpperCase() + 
          `${Math.floor(Math.random() * 99)}`;
        }else{
         id+= letter.charAt(Math.floor(Math.random() * letter.length)) +  
          `${Math.floor(Math.random() * 99)}`;
        }
      }
      return id;
  }