/*

    1.2 Notación asintótica (Big O, Omega, Theta)

    La notacion asintotica describe como crece el tiempo de ejecucion o el uso de memoria de un algoritmo a medida que el tamano de la entrada n crece asta el infinito. 

    Cuando los valores son gigantes solo termino mayor importa, los terminos menores y las constantes no importan.

    ejemplo: 3n^2 + 5n + 7 solo 3n^2 importa, entonces decimos que es O(n^2).

    La notacion asintotica nos permite comparar algoritmos de manera objetiva, sin importar el hardware, lenguaje de programacion o implementacion especifica.
    
    Funcion de coste:

    Todo algoridmo puede representarce como una funcion.
    Tipos de notacion asintotica:
    */
        function f(n) {
            for(i=0;i<n;i++)
                for(j=0;j<n;j++)
             cout<<i;
        }  
               
        // n*n ; f(n) = n^2; O(n^2)
  
        
/*

    Existen tres maneras de describir el crecimiento.

Big O (O)
Big Omega (Ω)
Big Theta (Θ)

Cada una responde una pregunta distinta.

Big O:   describe el peor caso, el maximo tiempo que tardaria un algoritmo en ejecutarce, o que tan lento puede ser un algoritmo. esto quiere decir  que el algoritmo no crece mas rapido que cierta function. 

Su definicion formal es la siguiente: 

se dice que f(n) = O(g(n))   si existen constantes positivas c y n_0 tal que f(n)≤c⋅g(n) para todo n≥n0​.

c es un multiplicador osea un numero que acompana la funcion 3n+2, 3 es c.

n_0 es una entrada a partir de la cual f(n) queda por debajo de g(n) digamos que a partir de el numero 3 la funcion g(n) se vuelve mas grande que f(n)  y f(n) no la puede supear.

ejemplo: 


para f(n)=3n+2 queremos demostrar que f(n)=O(n) debemos encontrar a c y n₀.

necesitamos que 3n+2 ≤ c·n. escojemos a c=4. entonces ahora 3n+2≤4n a partir de 2≤n por tanto n₀=2, resultado 3n+2=O(n).


Omega : Describe el mínimo tiempo que tardaría un algoritmo en ejecutarce. describe una cota inferior, un algoritmo nunca se ejecutara mas rápido que su función omega.

su definición formal es la siguiente: 

se dice que f(n)=Ω(g(n)) si existen C y n₀ tales que f(n)≥c⋅g(n)  para todo f(n)≥c⋅g(n).

Ejemplo: 

f(n)=5n+10 Queremos demostrar Ω(n), Tomamos c=5 Entonces 5n+10≥5n Siempre se cumple.  solucion 5n+10=Ω(n)


Theta (Θ) : es una cota ajustada. Seda cuando la cota superior (big o) y la cota inferior (omega) coinciden. se usa theta para indicar el comportamiento exacto.


Su definicion formal es la siguiente: 

f(n)=Θ(g(n))  si f(n)=O(g(n)) y f(n)=Ω(g(n)) ;  Matemáticamente Existen constantes c₁ y c₂ tales que c1​g(n)≤f(n)≤c2​g(n)  La función queda "encerrada" entre dos múltiplos de g(n).


ejemplo completo: 

Sea f(n)=3n²+5n+2  Queremos hallar su notación asintótica.

Paso 1

Observamos el término dominante.

3n²

Los demás términos son menos importantes para valores grandes de n.

Paso 2

Big O

Buscamos una función que esté por encima.

3n²+5n+2≤10n²

para valores grandes de n.

Entonces

O(n²)

Paso 3

Omega

Ahora buscamos una función que esté por debajo.

3n²+5n+2≥3n²

Siempre ocurre.

Entonces

Ω(n²)
Paso 4

Como ambas coinciden,

Θ(n²)

*/


    