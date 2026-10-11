/* End-semester mock papers in the official format: 5 questions of 10 marks, each in 3 parts of 2/3/4/5 marks.
   Every code answer and every predicted output was checked with gcc. */
PPS.EXAM=[
 {
  "id": "mp1",
  "title": "Mock paper 1",
  "questions": [
   {
    "co": "CO1",
    "parts": [
     {
      "m": 2,
      "bl": "Understand",
      "q": "Name the functional units of a computer. State the role of the ALU and of the control unit.",
      "a": "Functional units: input unit, central processing unit (control unit, ALU, registers), memory unit (primary and secondary) and output unit.\nALU: performs arithmetic (+, −, ×, ÷) and logical operations (comparisons such as A > B, AND, OR).\nControl unit: fetches each instruction from memory, decodes it and directs the other units to carry it out.",
      "scheme": [
       [
        "1",
        "All functional units named"
       ],
       [
        "0.5",
        "Role of the ALU"
       ],
       [
        "0.5",
        "Role of the control unit"
       ]
      ],
      "plain": true
     },
     {
      "m": 3,
      "bl": "Apply",
      "q": "Write an algorithm to check whether a year is a leap year, and name the flowchart symbol for each step.",
      "a": "Step 1: Start                                         (oval)\nStep 2: Read YEAR                                     (parallelogram)\nStep 3: If (YEAR mod 4 = 0 and YEAR mod 100 ≠ 0)\n        or YEAR mod 400 = 0                           (diamond)\nStep 4:     Print \"Leap year\"                         (parallelogram)\nStep 5: Else Print \"Not a leap year\"                  (parallelogram)\nStep 6: Stop                                          (oval)",
      "scheme": [
       [
        "2",
        "Correct condition, including the 100 and 400 rules"
       ],
       [
        "1",
        "Correct symbols, with Start, Stop and labelled Yes/No exits"
       ]
      ],
      "plain": true
     },
     {
      "m": 5,
      "bl": "Understand",
      "q": "A program is saved as hello.c and built with gcc hello.c -o hello. Explain each stage from source code to a running program, naming the file produced at each stage. Give one error found at compile time and one that appears only when the program runs.",
      "a": "Preprocessing (hello.i): #include and #define lines are expanded and comments removed.\nCompilation (hello.s): C is checked for syntax and translated into assembly. Syntax errors such as a missing semicolon are reported here.\nAssembly (hello.o): assembly becomes machine code, the object file, with addresses of library functions still unresolved.\nLinking (hello or a.out): the linker joins the object file with library code such as printf, producing the executable.\nLoading and running: the operating system loads the executable into RAM and the CPU starts at main().\nCompile-time error: int a = 5 (missing semicolon). Run-time error: scanf(\"%d\", n) without & crashes or reads garbage; dividing by a variable that is 0.",
      "scheme": [
       [
        "3",
        "Four build stages with the file produced by each (about 0.75 each)"
       ],
       [
        "1",
        "Loading and running"
       ],
       [
        "1",
        "One compile-time and one run-time error with examples"
       ]
      ],
      "plain": true
     }
    ]
   },
   {
    "co": "CO2",
    "parts": [
     {
      "m": 3,
      "bl": "Apply",
      "q": "int a = 10, b = 3; float c; Find the value of each expression, showing the steps: (i) a / b * b  (ii) a % b + a / b  (iii) c = (float)a / b",
      "a": "(i) a / b = 3 (integer division), then 3 * 3 = 9\n(ii) a % b = 1 and a / b = 3, so 1 + 3 = 4\n(iii) (float)a = 10.0, then 10.0 / 3 = 3.333333",
      "scheme": [
       [
        "1",
        "(i) 9, with integer division explained"
       ],
       [
        "1",
        "(ii) 4"
       ],
       [
        "1",
        "(iii) 3.333333, with the cast explained"
       ]
      ],
      "plain": true
     },
     {
      "m": 3,
      "bl": "Analyse",
      "q": "Predict the output and explain it.",
      "a": "Output: 1 2 3 5 6 7\nMultiples of 4 (4 and 8) are skipped by continue. When i reaches 9, which is not a multiple of 4 and is greater than 7, break ends the loop, so 9 and 10 never print.",
      "scheme": [
       [
        "2",
        "Correct output"
       ],
       [
        "1",
        "Explanation of continue and break"
       ]
      ],
      "qcode": "for (int i = 1; i <= 10; i++) {\n    if (i % 4 == 0)\n        continue;\n    if (i > 7)\n        break;\n    printf(\"%d \", i);\n}",
      "plain": true
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program to check whether a number is an Armstrong number: the sum of its digits, each raised to the power of the number of digits, equals the number (for example 153 = 1³ + 5³ + 3³ and 1634 = 1⁴ + 6⁴ + 3⁴ + 4⁴).",
      "a": "#include <stdio.h>\nint main(void)\n{\n    int n, t, digits = 0, sum = 0;\n    scanf(\"%d\", &n);\n    for (t = n; t > 0; t /= 10)          /* count the digits */\n        digits++;\n    for (t = n; t > 0; t /= 10) {\n        int d = t % 10, p = 1;\n        for (int k = 0; k < digits; k++) /* d to the power digits */\n            p *= d;\n        sum += p;\n    }\n    if (n > 0 && sum == n) printf(\"%d is an Armstrong number\\n\", n);\n    else printf(\"%d is not an Armstrong number\\n\", n);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Counts the digits"
       ],
       [
        "2",
        "Extracts each digit and raises it to the power with a loop"
       ],
       [
        "1",
        "Correct comparison and output"
       ]
      ],
      "sample": [
       "1634\n",
       "1634 is an Armstrong number\n"
      ]
     }
    ]
   },
   {
    "co": "CO3",
    "parts": [
     {
      "m": 2,
      "bl": "Apply",
      "q": "Show the array after each of the first two passes of selection sort (ascending) on {64, 25, 12, 22, 11}.",
      "a": "Pass 1: the minimum 11 is swapped with 64: {11, 25, 12, 22, 64}\nPass 2: the minimum of the rest, 12, is swapped with 25: {11, 12, 25, 22, 64}",
      "scheme": [
       [
        "1",
        "Pass 1 correct"
       ],
       [
        "1",
        "Pass 2 correct"
       ]
      ],
      "plain": true
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program that reads a word and prints whether it is a palindrome (ignoring case) and how many vowels it contains, without using strrev.",
      "a": "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nint main(void)\n{\n    char s[50];\n    int ok = 1, vowels = 0;\n    scanf(\"%49s\", s);\n    int len = (int)strlen(s);\n    for (int i = 0; i < len / 2; i++)\n        if (tolower((unsigned char)s[i]) != tolower((unsigned char)s[len - 1 - i])) ok = 0;\n    for (int i = 0; i < len; i++) {\n        char c = (char)tolower((unsigned char)s[i]);\n        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') vowels++;\n    }\n    printf(\"%s is %sa palindrome, %d vowels\\n\", s, ok ? \"\" : \"not \", vowels);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Reads the string safely"
       ],
       [
        "2",
        "Compares from both ends, ignoring case"
       ],
       [
        "1",
        "Counts vowels"
       ]
      ],
      "sample": [
       "Malayalam\n",
       "Malayalam is a palindrome, 4 vowels\n"
      ]
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program to multiply two matrices. Print an error if they cannot be multiplied.",
      "a": "#include <stdio.h>\nint main(void)\n{\n    int a[10][10], b[10][10], c[10][10], r1, c1, r2, c2;\n    scanf(\"%d %d\", &r1, &c1);\n    for (int i = 0; i < r1; i++) for (int j = 0; j < c1; j++) scanf(\"%d\", &a[i][j]);\n    scanf(\"%d %d\", &r2, &c2);\n    for (int i = 0; i < r2; i++) for (int j = 0; j < c2; j++) scanf(\"%d\", &b[i][j]);\n    if (c1 != r2) { printf(\"Cannot multiply\\n\"); return 0; }\n    for (int i = 0; i < r1; i++)\n        for (int j = 0; j < c2; j++) {\n            c[i][j] = 0;\n            for (int k = 0; k < c1; k++) c[i][j] += a[i][k] * b[k][j];\n        }\n    for (int i = 0; i < r1; i++) {\n        for (int j = 0; j < c2; j++) printf(\"%5d\", c[i][j]);\n        printf(\"\\n\");\n    }\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Reads both matrices with their sizes"
       ],
       [
        "1",
        "Checks columns of A = rows of B"
       ],
       [
        "2",
        "Three nested loops with the sum reset for each cell"
       ]
      ],
      "sample": [
       "2 2\n1 2\n3 4\n2 2\n5 6\n7 8\n",
       "   19   22\n   43   50\n"
      ]
     }
    ]
   },
   {
    "co": "CO4",
    "parts": [
     {
      "m": 3,
      "bl": "Analyse",
      "q": "What does this program print? Explain using the terms actual parameter, formal parameter and scope.",
      "a": "Output: 5 10\nThe global x (5) is the actual parameter. Its value is copied into the formal parameter x of change, which is a local variable that hides the global one inside the function. Doubling the local copy gives 10, which is returned into y; the global x is unchanged.",
      "scheme": [
       [
        "1",
        "Correct output"
       ],
       [
        "1",
        "Actual and formal parameters, call by value"
       ],
       [
        "1",
        "Scope: the local x hides the global x"
       ]
      ],
      "qcode": "int x = 5;\nint change(int x) {\n    x = x * 2;\n    return x;\n}\nint main(void) {\n    int y = change(x);\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
      "plain": true
     },
     {
      "m": 3,
      "bl": "Apply",
      "q": "Write a recursive function long power(int x, int n) for x to the power n, and trace the calls for power(2, 3).",
      "a": "long power(int x, int n)\n{\n    if (n == 0) return 1;            /* base case */\n    return x * power(x, n - 1);      /* recursive case */\n}\n\nTrace: power(2,3) = 2 * power(2,2)\n                  = 2 * (2 * power(2,1))\n                  = 2 * (2 * (2 * power(2,0)))\n                  = 2 * 2 * 2 * 1 = 8",
      "scheme": [
       [
        "1",
        "Base case"
       ],
       [
        "1",
        "Recursive case"
       ],
       [
        "1",
        "Trace with the correct result 8"
       ]
      ],
      "plain": true
     },
     {
      "m": 4,
      "bl": "Create",
      "q": "Write int isPrime(int n) and int countPrimes(int a[], int n), which uses isPrime. In main, read n numbers and print how many are prime.",
      "a": "#include <stdio.h>\nint isPrime(int n)\n{\n    if (n < 2) return 0;\n    for (int d = 2; d * d <= n; d++)\n        if (n % d == 0) return 0;\n    return 1;\n}\nint countPrimes(int a[], int n)\n{\n    int c = 0;\n    for (int i = 0; i < n; i++)\n        if (isPrime(a[i])) c++;          /* nesting: one function calls another */\n    return c;\n}\nint main(void)\n{\n    int n, a[100];\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    printf(\"%d primes\\n\", countPrimes(a, n));\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "isPrime correct, including n < 2"
       ],
       [
        "1",
        "countPrimes calls isPrime in a loop"
       ],
       [
        "1",
        "Array passed with its size"
       ],
       [
        "1",
        "main reads input and prints the count"
       ]
      ],
      "sample": [
       "7\n2 9 11 15 17 1 23\n",
       "4 primes\n"
      ]
     }
    ]
   },
   {
    "co": "CO5",
    "parts": [
     {
      "m": 2,
      "bl": "Understand",
      "q": "Distinguish between an array of structures and a structure containing an array, with a declaration of each.",
      "a": "Array of structures: many records of the same type, such as struct student cls[60]; where cls[i].marks is the marks of student i.\nStructure containing an array: one record with a list inside it, such as struct student { int roll; int marks[5]; }; where s.marks[2] is the third subject of one student.",
      "scheme": [
       [
        "1",
        "Array of structures with a declaration"
       ],
       [
        "1",
        "Structure with an array member with a declaration"
       ]
      ],
      "plain": true
     },
     {
      "m": 3,
      "bl": "Analyse",
      "q": "Predict the output and explain each line.",
      "a": "Output:\nI\nTER\n4\n*(p + 2) is s[2], which is I. After p += 4, p points at s[4], so %s prints from there to the \\0: TER. p − s counts the characters between them: 4.",
      "scheme": [
       [
        "1",
        "I"
       ],
       [
        "1",
        "TER"
       ],
       [
        "1",
        "4, with the explanation"
       ]
      ],
      "qcode": "char s[] = \"POINTER\";\nchar *p = s;\nprintf(\"%c\\n\", *(p + 2));\np += 4;\nprintf(\"%s\\n\", p);\nprintf(\"%d\\n\", (int)(p - s));",
      "plain": true
     },
     {
      "m": 5,
      "bl": "Create",
      "q": "Read n employee records (id, one-word name, salary) into an array of structures, write them to emp.txt, then read the file back and print the employees who earn more than the average salary.",
      "a": "#include <stdio.h>\nstruct emp { int id; char name[20]; float salary; };\nint main(void)\n{\n    struct emp e[50], t;\n    int n, count = 0;\n    float sum = 0;\n    scanf(\"%d\", &n);\n    FILE *fp = fopen(\"emp.txt\", \"w\");\n    if (fp == NULL) { printf(\"Cannot create emp.txt\\n\"); return 1; }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d %19s %f\", &e[i].id, e[i].name, &e[i].salary);\n        fprintf(fp, \"%d %s %.2f\\n\", e[i].id, e[i].name, e[i].salary);\n    }\n    fclose(fp);\n    fp = fopen(\"emp.txt\", \"r\");\n    if (fp == NULL) { printf(\"Cannot open emp.txt\\n\"); return 1; }\n    while (fscanf(fp, \"%d %19s %f\", &t.id, t.name, &t.salary) == 3) { sum += t.salary; count++; }\n    rewind(fp);\n    float avg = sum / count;\n    printf(\"Average %.2f\\n\", avg);\n    while (fscanf(fp, \"%d %19s %f\", &t.id, t.name, &t.salary) == 3)\n        if (t.salary > avg) printf(\"%d %s %.2f\\n\", t.id, t.name, t.salary);\n    fclose(fp);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Structure definition and array of structures"
       ],
       [
        "1",
        "Writes records with fprintf in \"w\" mode, checking NULL"
       ],
       [
        "1",
        "Reopens in \"r\" mode and reads with fscanf until the end"
       ],
       [
        "1",
        "Computes the average"
       ],
       [
        "1",
        "Prints employees above the average, closes the file"
       ]
      ],
      "sample": [
       "4\n1 Asha 52000\n2 Ravi 38000\n3 Meena 61000\n4 Kiran 45000\n",
       "Average 49000.00\n1 Asha 52000.00\n3 Meena 61000.00\n"
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "mp2",
  "title": "Mock paper 2",
  "questions": [
   {
    "co": "CO1",
    "parts": [
     {
      "m": 3,
      "bl": "Understand",
      "q": "Differentiate machine language, assembly language and high-level language, and name the translator each needs.",
      "a": "Machine language: binary instructions the CPU runs directly; fast but hard to read and machine-dependent; no translator needed.\nAssembly language: short mnemonics such as MOV and ADD, one per machine instruction; still machine-dependent; translated by an assembler.\nHigh-level language: English-like statements such as sum = a + b; portable across machines; translated by a compiler (C) or an interpreter (Python).",
      "scheme": [
       [
        "1",
        "Machine language"
       ],
       [
        "1",
        "Assembly language and the assembler"
       ],
       [
        "1",
        "High-level language and the compiler or interpreter"
       ]
      ],
      "plain": true
     },
     {
      "m": 3,
      "bl": "Apply",
      "q": "Write an algorithm to find the largest of three numbers and dry-run it with A = 7, B = 12, C = 5.",
      "a": "Step 1: Start\nStep 2: Read A, B, C\nStep 3: If A > B and A > C then LARGEST <- A\nStep 4: Else if B > C then LARGEST <- B\nStep 5: Else LARGEST <- C\nStep 6: Print LARGEST\nStep 7: Stop\n\nDry run: is 7 > 12? No. Is 12 > 5? Yes, so LARGEST = 12. Output: 12.",
      "scheme": [
       [
        "2",
        "Correct algorithm with Start and Stop"
       ],
       [
        "1",
        "Dry run with output 12"
       ]
      ],
      "plain": true
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program that reads a number of seconds and prints it as hours, minutes and seconds (for example 3725 → 1 h 2 min 5 s).",
      "a": "#include <stdio.h>\nint main(void)\n{\n    int total, h, m, s;\n    scanf(\"%d\", &total);\n    h = total / 3600;               /* whole hours */\n    m = (total % 3600) / 60;        /* whole minutes left over */\n    s = total % 60;                 /* seconds left over */\n    printf(\"%d h %d min %d s\\n\", h, m, s);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Reads input correctly"
       ],
       [
        "2",
        "Correct use of / and %"
       ],
       [
        "1",
        "Formatted output"
       ]
      ],
      "sample": [
       "3725\n",
       "1 h 2 min 5 s\n"
      ]
     }
    ]
   },
   {
    "co": "CO2",
    "parts": [
     {
      "m": 2,
      "bl": "Apply",
      "q": "Find x, y and z after these statements, showing the steps.",
      "a": "y = x++ + 2 uses the old x (5), so y = 7, then x becomes 6.\nz = --x * 2 first decrements x to 5, then z = 5 * 2 = 10.\nFinal values: x = 5, y = 7, z = 10.",
      "scheme": [
       [
        "1",
        "y = 7 with postfix explained"
       ],
       [
        "1",
        "x = 5 and z = 10 with prefix explained"
       ]
      ],
      "qcode": "int x = 5;\nint y = x++ + 2;\nint z = --x * 2;",
      "plain": true
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a menu-driven program using switch inside a do-while loop. Option 1 prints the sum of digits of a number, 2 prints its reverse, 3 says whether it is even or odd, and 0 exits.",
      "a": "#include <stdio.h>\nint main(void)\n{\n    int choice, n;\n    do {\n        scanf(\"%d\", &choice);\n        if (choice == 0) break;\n        scanf(\"%d\", &n);\n        switch (choice) {\n            case 1: {\n                int s = 0;\n                for (int t = n; t > 0; t /= 10) s += t % 10;\n                printf(\"Sum of digits of %d = %d\\n\", n, s);\n                break;\n            }\n            case 2: {\n                int r = 0;\n                for (int t = n; t > 0; t /= 10) r = r * 10 + t % 10;\n                printf(\"Reverse of %d = %d\\n\", n, r);\n                break;\n            }\n            case 3:\n                printf(\"%d is %s\\n\", n, n % 2 == 0 ? \"even\" : \"odd\");\n                break;\n            default:\n                printf(\"Invalid choice\\n\");\n        }\n    } while (choice != 0);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "do-while loop that repeats until 0"
       ],
       [
        "1",
        "switch with break in each case and a default"
       ],
       [
        "2",
        "Correct logic for the three options"
       ]
      ],
      "sample": [
       "1 4521\n2 4521\n3 77\n5 9\n0\n",
       "Sum of digits of 4521 = 12\nReverse of 4521 = 1254\n77 is odd\nInvalid choice\n"
      ]
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program that prints this number pyramid for n rows (shown for n = 4).",
      "a": "#include <stdio.h>\nint main(void)\n{\n    int n;\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) {\n        for (int s = 1; s <= n - i; s++) printf(\" \");     /* leading spaces */\n        for (int j = 1; j <= i; j++) printf(j < i ? \"%d \" : \"%d\", j);\n        printf(\"\\n\");\n    }\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Outer loop over rows"
       ],
       [
        "1",
        "Leading spaces loop"
       ],
       [
        "2",
        "Numbers loop and a newline per row"
       ]
      ],
      "qcode": "   1\n  1 2\n 1 2 3\n1 2 3 4",
      "sample": [
       "4\n",
       "   1\n  1 2\n 1 2 3\n1 2 3 4\n"
      ]
     }
    ]
   },
   {
    "co": "CO3",
    "parts": [
     {
      "m": 3,
      "bl": "Analyse",
      "q": "Trace binary search for key 50 in {3, 8, 15, 23, 42, 57, 61}. Show low, high and mid at each step and state the result.",
      "a": "Step 1: low = 0, high = 6, mid = 3, a[3] = 23 < 50, so low = 4\nStep 2: low = 4, high = 6, mid = 5, a[5] = 57 > 50, so high = 4\nStep 3: low = 4, high = 4, mid = 4, a[4] = 42 < 50, so low = 5\nNow low > high, so 50 is not present. 3 comparisons were made.",
      "scheme": [
       [
        "2",
        "Correct low, high and mid at each step"
       ],
       [
        "1",
        "Correct conclusion: not found after 3 comparisons"
       ]
      ],
      "plain": true
     },
     {
      "m": 3,
      "bl": "Apply",
      "q": "Write a program that reads a line of text and prints how many times each letter appears, ignoring case.",
      "a": "#include <stdio.h>\n#include <ctype.h>\nint main(void)\n{\n    char s[200];\n    int count[26] = {0};\n    if (fgets(s, sizeof s, stdin) == NULL) return 0;\n    for (int i = 0; s[i] != '\\0'; i++)\n        if (isalpha((unsigned char)s[i]))\n            count[tolower((unsigned char)s[i]) - 'a']++;\n    for (int k = 0; k < 26; k++)\n        if (count[k]) printf(\"%c=%d \", 'a' + k, count[k]);\n    printf(\"\\n\");\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Reads the line with fgets"
       ],
       [
        "1",
        "Uses letter − 'a' as the index into a count array"
       ],
       [
        "1",
        "Prints only letters that occur"
       ]
      ],
      "sample": [
       "Hello World\n",
       "d=1 e=1 h=1 l=3 o=2 r=1 w=1 \n"
      ]
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a program to read n names and print them in alphabetical order.",
      "a": "#include <stdio.h>\n#include <string.h>\nint main(void)\n{\n    char names[50][20], temp[20];\n    int n;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) scanf(\"%19s\", names[i]);\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (strcmp(names[j], names[j + 1]) > 0) {\n                strcpy(temp, names[j]);\n                strcpy(names[j], names[j + 1]);\n                strcpy(names[j + 1], temp);\n            }\n    for (int i = 0; i < n; i++) printf(\"%s\\n\", names[i]);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "2-D char array and input"
       ],
       [
        "2",
        "strcmp to compare and strcpy with a temporary to swap"
       ],
       [
        "1",
        "Output in order"
       ]
      ],
      "sample": [
       "5\nRavi\nAsha\nMeena\nDivya\nKiran\n",
       "Asha\nDivya\nKiran\nMeena\nRavi\n"
      ]
     }
    ]
   },
   {
    "co": "CO4",
    "parts": [
     {
      "m": 2,
      "bl": "Understand",
      "q": "What is recursion? Give two differences between recursion and iteration.",
      "a": "Recursion is when a function calls itself on a smaller version of the problem until it reaches a base case.\n1. Recursion repeats by calling the function again; iteration repeats with a loop.\n2. Each recursive call uses a new stack frame, so recursion uses more memory and can overflow the stack; a loop uses the same variables.",
      "scheme": [
       [
        "1",
        "Definition, with the base case mentioned"
       ],
       [
        "1",
        "Two valid differences"
       ]
      ],
      "plain": true
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write void swap(int *x, int *y) and use it in void reverseArray(int a[], int n) to reverse an array in place. Show the array before and after in main.",
      "a": "#include <stdio.h>\nvoid swap(int *x, int *y)\n{\n    int t = *x;\n    *x = *y;\n    *y = t;\n}\nvoid reverseArray(int a[], int n)\n{\n    for (int i = 0; i < n / 2; i++)\n        swap(&a[i], &a[n - 1 - i]);       /* pass addresses */\n}\nint main(void)\n{\n    int a[] = {1, 2, 3, 4, 5}, n = 5;\n    for (int i = 0; i < n; i++) printf(\"%d \", a[i]);\n    printf(\"\\n\");\n    reverseArray(a, n);\n    for (int i = 0; i < n; i++) printf(\"%d \", a[i]);\n    printf(\"\\n\");\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "swap with pointer parameters"
       ],
       [
        "1",
        "reverseArray loops to n / 2"
       ],
       [
        "1",
        "Passes &a[i] and &a[n − 1 − i]"
       ],
       [
        "1",
        "main prints before and after"
       ]
      ],
      "sample": [
       "",
       "1 2 3 4 5 \n5 4 3 2 1 \n"
      ]
     },
     {
      "m": 4,
      "bl": "Apply",
      "q": "Write a recursive function int gcd(int a, int b) and use it to reduce a fraction p/q to its lowest terms.",
      "a": "#include <stdio.h>\nint gcd(int a, int b)\n{\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\nint main(void)\n{\n    int p, q;\n    scanf(\"%d %d\", &p, &q);\n    if (q == 0) { printf(\"Denominator cannot be 0\\n\"); return 0; }\n    int g = gcd(p, q);\n    printf(\"%d/%d = %d/%d\\n\", p, q, p / g, q / g);\n    return 0;\n}",
      "scheme": [
       [
        "2",
        "Recursive gcd with base case b == 0"
       ],
       [
        "1",
        "Divides both by the gcd"
       ],
       [
        "1",
        "Handles q = 0"
       ]
      ],
      "sample": [
       "84 126\n",
       "84/126 = 2/3\n"
      ]
     }
    ]
   },
   {
    "co": "CO5",
    "parts": [
     {
      "m": 3,
      "bl": "Apply",
      "q": "Define struct date (day, month, year) and struct student (roll, name, dob of type struct date). Read one student and print the details.",
      "a": "#include <stdio.h>\nstruct date { int day, month, year; };\nstruct student {\n    int roll;\n    char name[20];\n    struct date dob;                 /* nested structure */\n};\nint main(void)\n{\n    struct student s;\n    scanf(\"%d %19s %d %d %d\", &s.roll, s.name, &s.dob.day, &s.dob.month, &s.dob.year);\n    printf(\"%d %s born %02d/%02d/%d\\n\", s.roll, s.name, s.dob.day, s.dob.month, s.dob.year);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Both structure definitions, with the nested member"
       ],
       [
        "1",
        "Reads members with chained dots"
       ],
       [
        "1",
        "Prints the details"
       ]
      ],
      "sample": [
       "101 Asha 5 9 2007\n",
       "101 Asha born 05/09/2007\n"
      ]
     },
     {
      "m": 3,
      "bl": "Analyse",
      "q": "Predict the output and explain.",
      "a": "Output:\n3 6\n5\nAfter p++, p points at a[1] (the next record, not the next byte), so p->x is 3. p + 1 points at a[2], so (p + 1)->y is 6. (*p).x is 3 and a[0].y is 2, giving 5.",
      "scheme": [
       [
        "1",
        "First line 3 6"
       ],
       [
        "1",
        "Second line 5"
       ],
       [
        "1",
        "Explains that p++ moves by one whole structure"
       ]
      ],
      "qcode": "struct pt { int x, y; };\nstruct pt a[3] = {{1, 2}, {3, 4}, {5, 6}};\nstruct pt *p = a;\np++;\nprintf(\"%d %d\\n\", p->x, (p + 1)->y);\nprintf(\"%d\\n\", (*p).x + a[0].y);",
      "plain": true
     },
     {
      "m": 4,
      "bl": "Create",
      "q": "Write a program that copies only the lines of in.txt that contain at least one digit into out.txt, and prints how many lines were copied.",
      "a": "#include <stdio.h>\n#include <ctype.h>\nint main(void)\n{\n    char line[200];\n    int copied = 0;\n    FILE *in = fopen(\"in.txt\", \"r\");\n    if (in == NULL) { printf(\"Cannot open in.txt\\n\"); return 1; }\n    FILE *out = fopen(\"out.txt\", \"w\");\n    if (out == NULL) { printf(\"Cannot create out.txt\\n\"); fclose(in); return 1; }\n    while (fgets(line, sizeof line, in) != NULL) {\n        int hasDigit = 0;\n        for (int i = 0; line[i] != '\\0'; i++)\n            if (isdigit((unsigned char)line[i])) hasDigit = 1;\n        if (hasDigit) { fputs(line, out); copied++; }\n    }\n    fclose(in);\n    fclose(out);\n    printf(\"Copied %d lines\\n\", copied);\n    return 0;\n}",
      "scheme": [
       [
        "1",
        "Opens both files with the right modes and checks NULL"
       ],
       [
        "1",
        "Reads line by line with fgets until NULL"
       ],
       [
        "1",
        "Detects a digit in the line"
       ],
       [
        "1",
        "Writes with fputs, counts and closes"
       ]
      ],
      "sample": [
       "in.txt:\nRoom 101 is free\nNo numbers here\nCES 1102 exam\nThe end\n",
       "Copied 2 lines\n"
      ]
     }
    ]
   }
  ]
 }
];
