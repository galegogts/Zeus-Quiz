export default function RandomOrder(num){
    let array_number = []; 
    for (let i = 0; i < num; i++) {
      array_number[i] = i;
    }
    for (let i = 0; i < num; i++) {
      const random_number = Math.floor(Math.random(1) * num);
      const temp_number = array_number[i];
      array_number[i] = array_number[random_number];
      array_number[random_number] = temp_number;
      
    }
    return array_number;
  }