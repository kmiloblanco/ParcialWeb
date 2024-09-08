function sumarCuadros(arrayNumeros) {
    
    const sumaTotal = arrayNumeros.reduce((acc, num) => acc + num, 0);

   
    for (const numero of arrayNumeros) {
        const cantidadGuiones = numero;
        const guiones = '-'.repeat(cantidadGuiones);
        console.log(`${numero}: ${guiones}`);
    }

  
    console.log(`${sumaTotal}: ${'-'.repeat(sumaTotal)}`);
}


const arrayNumeros = [1, 23, 453, 3267, 12354, 123456];
sumarCuadros(arrayNumeros);
