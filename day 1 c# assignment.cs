
//Give example for Operators

using System;


class Program
{
    static void Main()
    {
        int a = 17;
        int b = 13;

        //Arithmetic operator

        Console.WriteLine(a + b);
        Console.WriteLine(a - b);
        Console.WriteLine(a * b);
        Console.WriteLine(a / b);

        Console.WriteLine(a > b);

        //Do type casting with different data dypes


        int num = 173;
        double d = num;


        double pi = 3.14;
        int whole = (int)pi;

        Console.WriteLine(d);
        Console.WriteLine(whole);


        //Do Looping Conditions with examples

        // For loop
        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine("Count: " + i);
        }

        // While loop
        int j = 1;
        while (j <= 3)
        {
            Console.WriteLine("While loop: " + j);
            j++;
        }


    }
}







       













