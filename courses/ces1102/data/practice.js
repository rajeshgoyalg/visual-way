/* Assessment practice: timed objective pools (PPS.TQ) and written questions (PPS.WQ).
   Every code-based answer here was compiled with gcc -Wall and run. Add new questions at the end of a pool. */
PPS.TQ.a2={"title": "Assignment 2 practice (CO3)", "minutes": 20, "count": 10, "marks": 5, "intro": "Arrays, searching, sorting, 2-D arrays and strings, including questions set in the self-directed learning projects.", "pool": [{"bl": "Apply", "q": "What does this print?", "c": "int a[5] = {1, 2, 3};\nprintf(\"%d\", a[3] + a[1]);", "o": ["2", "5", "A garbage value", "Compile error"], "a": 0, "w": "a[3] was not initialised in the list, so it is 0. a[1] is 2, so the sum is 2."}, {"bl": "Apply", "q": "What is the value of s after this loop?", "c": "int a[] = {4, 8, 15, 16, 23};\nint s = 0;\nfor (int i = 0; i < 5; i += 2)\n    s += a[i];", "o": ["42", "24", "66", "19"], "a": 0, "w": "i takes 0, 2 and 4, so s = 4 + 15 + 23 = 42."}, {"bl": "Analyse", "q": "This code should add the 5 elements of int a[5]. What is wrong?", "c": "for (int i = 0; i <= 5; i++)\n    sum += a[i];", "o": ["Nothing", "It reads a[5], which is outside the array", "It skips a[0]", "sum must be a float"], "a": 1, "w": "Valid indices are 0 to 4. With i <= 5 the loop also reads a[5], one past the end."}, {"bl": "Apply", "q": "Binary search for 42 in {3, 9, 14, 21, 30, 42, 57}. How many elements are compared with 42?", "o": ["1", "2", "3", "6"], "a": 1, "w": "mid = 3 gives 21, so search the right half (low = 4). mid = 5 gives 42: found after 2 comparisons."}, {"bl": "Evaluate", "q": "On which array can binary search be used directly?", "o": ["{12, 5, 9, 1}", "{1, 5, 9, 12}", "{9, 1, 12, 5}", "Any array"], "a": 1, "w": "Binary search needs the data sorted, because it throws away the half that cannot contain the key."}, {"bl": "Apply", "q": "Linear search for a key that is the last of 40 elements. How many comparisons?", "o": ["1", "20", "40", "6"], "a": 2, "w": "Linear search checks every element from the start, so it reaches the 40th after 40 comparisons."}, {"bl": "Apply", "q": "Bubble sort (ascending) on {5, 1, 4, 2, 8}. What is the array after two passes?", "o": ["{1, 2, 4, 5, 8}", "{1, 4, 2, 5, 8}", "{1, 2, 5, 4, 8}", "{5, 4, 2, 1, 8}"], "a": 0, "w": "Pass 1 gives {1, 4, 2, 5, 8}. Pass 2 swaps 4 and 2, giving {1, 2, 4, 5, 8}."}, {"bl": "Apply", "q": "Selection sort (ascending) on {29, 10, 14, 37, 13}. What is the array after the first pass?", "o": ["{10, 29, 14, 37, 13}", "{10, 13, 14, 29, 37}", "{29, 10, 14, 13, 37}", "{10, 14, 29, 37, 13}"], "a": 0, "w": "The minimum, 10, is swapped with the first element, 29. Nothing else moves in pass 1."}, {"bl": "Evaluate", "q": "Moving records is slow (each swap copies a large record). Which sort should you choose?", "o": ["Bubble sort", "Selection sort", "They are identical", "Neither can sort records"], "a": 1, "w": "Both make the same number of comparisons, but selection sort makes at most n − 1 swaps."}, {"bl": "Analyse", "q": "For which input does bubble sort with an early-stop check finish after a single pass?", "o": ["Reverse sorted", "Already sorted", "All values different", "Any input"], "a": 1, "w": "If the first pass makes no swaps, the array is already sorted and the loop stops."}, {"bl": "Apply", "q": "What does this print?", "c": "int m[2][3] = {{1, 2, 3}, {4, 5, 6}};\nprintf(\"%d\", m[1][2] - m[0][1]);", "o": ["4", "3", "1", "-1"], "a": 0, "w": "m[1][2] is 6 and m[0][1] is 2, so 6 − 2 = 4."}, {"bl": "Apply", "q": "For int a[4][5], how many elements come before a[2][3] in memory?", "o": ["13", "11", "17", "6"], "a": 0, "w": "Row-major: offset = row × columns + column = 2 × 5 + 3 = 13."}, {"bl": "Apply", "q": "int a[3][4] starts at address 2000 and an int is 4 bytes. What is the address of a[1][2]?", "o": ["2012", "2024", "2006", "2020"], "a": 1, "w": "Offset = 1 × 4 + 2 = 6 elements, and 6 × 4 bytes = 24, so 2000 + 24 = 2024."}, {"bl": "Analyse", "q": "What does this print?", "c": "int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 10}};\nint s = 0;\nfor (int i = 0; i < 3; i++)\n    s += m[i][2 - i];\nprintf(\"%d\", s);", "o": ["15", "16", "18", "24"], "a": 0, "w": "m[i][2 − i] walks the other diagonal: m[0][2] + m[1][1] + m[2][0] = 3 + 5 + 7 = 15."}, {"bl": "Evaluate", "q": "Which matrix product is NOT possible?", "o": ["(3 × 2) × (2 × 4)", "(2 × 3) × (3 × 3)", "(2 × 3) × (2 × 3)", "(1 × 4) × (4 × 1)"], "a": 2, "w": "A × B needs columns of A to equal rows of B. A 2 × 3 matrix times a 2 × 3 matrix fails (3 ≠ 2)."}, {"bl": "Apply", "q": "char s[] = \"MIT\"; What are sizeof(s) and strlen(s)?", "o": ["3 and 3", "4 and 3", "3 and 4", "4 and 4"], "a": 1, "w": "The array holds M, I, T and \\0 (4 bytes). strlen counts the characters before \\0 (3)."}, {"bl": "Analyse", "q": "What does this print?", "c": "char s[20] = \"Hello\";\ns[2] = '\\0';\nprintf(\"%s\", s);", "o": ["Hello", "He", "Heo", "H"], "a": 1, "w": "printf stops at the first \\0, which is now at index 2. Only \"He\" is printed."}, {"bl": "Apply", "q": "What sign does strcmp(\"apple\", \"apricot\") return?", "o": ["Zero", "Negative", "Positive", "It depends on the lengths"], "a": 1, "w": "The first difference is p versus r at index 2. p comes before r, so the result is negative."}, {"bl": "Analyse", "q": "What is wrong here?", "c": "char a[6] = \"Hello\";\nstrcat(a, \"!\");", "o": ["Nothing", "\"Hello!\" needs 7 bytes, so strcat writes past the array", "strcat needs &a", "You cannot strcat a single character"], "a": 1, "w": "\"Hello!\" plus \\0 is 7 bytes, but a has 6. C does not check, so it overwrites memory: a buffer overflow."}, {"bl": "Apply", "q": "What does this print?", "c": "char s[] = \"banana\";\nint c = 0;\nfor (int i = 0; s[i] != '\\0'; i++)\n    if (s[i] == 'a') c++;\nprintf(\"%d\", c);", "o": ["2", "3", "6", "1"], "a": 1, "w": "banana has a at indices 1, 3 and 5."}, {"bl": "Apply", "q": "What does this print?", "c": "char s[] = \"CODE\";\nfor (int i = strlen(s) - 1; i >= 0; i--)\n    putchar(s[i]);", "o": ["CODE", "EDOC", "EDO", "ODE"], "a": 1, "w": "The loop starts at the last character (index 3) and walks back to index 0."}, {"bl": "Apply", "q": "The user types Ravi Kumar. What does scanf(\"%s\", name) store in name?", "o": ["Ravi Kumar", "Ravi", "Kumar", "Nothing"], "a": 1, "w": "%s stops at the first space. Use fgets to read the whole line."}, {"bl": "Apply", "q": "What does this print?", "c": "char s[] = \"c Lab\";\nfor (int i = 0; s[i]; i++)\n    if (s[i] >= 'a' && s[i] <= 'z')\n        s[i] = s[i] - 32;\nprintf(\"%s\", s);", "o": ["C LAB", "c LAB", "C Lab", "c lab"], "a": 0, "w": "Lowercase letters are 32 more than their uppercase forms in ASCII, so subtracting 32 converts them. The space and L are left alone."}, {"bl": "Analyse", "q": "This palindrome check always says \"not a palindrome\". Why?", "c": "for (i = 0; i < len / 2; i++)\n    if (s[i] != s[len - i]) ok = 0;", "o": ["len should be len + 1", "s[len − i] is wrong: when i = 0 it compares with \\0; use s[len − 1 − i]", "The loop should run to len", "strcmp is required"], "a": 1, "w": "The last character is at index len − 1. s[len] is the terminator, so the first comparison always fails."}, {"bl": "Analyse", "q": "Student marks system: what does this print?", "c": "int m[4] = {60, 75, 90, 45};\nfloat avg = (m[0] + m[1] + m[2] + m[3]) / 4;\nprintf(\"%.2f\", avg);", "o": ["67.50", "67.00", "67", "Compile error"], "a": 1, "w": "The sum 270 and 4 are both ints, so 270 / 4 is 67 before it is stored in avg. Divide by 4.0 to get 67.50."}, {"bl": "Analyse", "q": "Inventory system: what is idx after this loop?", "c": "int p[4] = {120, 450, 300, 450};\nint idx = 0;\nfor (int i = 1; i < 4; i++)\n    if (p[i] > p[idx]) idx = i;", "o": ["1", "3", "450", "0"], "a": 0, "w": "The test is strictly greater, so the second 450 at index 3 does not replace the first one at index 1."}, {"bl": "Evaluate", "q": "A text analyser counts words as (number of spaces + 1). For \"C  is fun\" (two spaces after C) it prints:", "o": ["3", "4", "5", "2"], "a": 1, "w": "There are 3 spaces, so it prints 4, although there are 3 words. Counting the start of each word is more reliable."}, {"bl": "Apply", "q": "Sorting product names A to Z with bubble sort: when should names[j] and names[j + 1] be swapped?", "o": ["strcmp(names[j], names[j + 1]) > 0", "strcmp(names[j], names[j + 1]) < 0", "names[j] > names[j + 1]", "strlen(names[j]) > strlen(names[j + 1])"], "a": 0, "w": "A positive strcmp result means names[j] comes later in the alphabet, so the pair is out of order."}, {"bl": "Evaluate", "q": "A library app searches 5,000 books sorted by ID, thousands of times a day. Which search should it use?", "o": ["Linear search", "Binary search", "Either, they are equally fast", "Sorting before every search"], "a": 1, "w": "The data is already sorted, and binary search needs about 13 comparisons instead of up to 5,000."}, {"bl": "Apply", "q": "What does this print?", "c": "int a[6] = {3, 8, 1, 9, 4, 7};\nint big = a[0], pos = 0;\nfor (int i = 1; i < 6; i++)\n    if (a[i] > big) { big = a[i]; pos = i; }\nprintf(\"%d %d\", big, pos);", "o": ["9 3", "9 4", "7 5", "8 1"], "a": 0, "w": "The largest value is 9, found at index 3."}]};
PPS.TQ.a3={"title": "Assignment 3 objective drill (CO4, CO5)", "minutes": 15, "count": 10, "intro": "Functions, recursion, pointers, structures and files.", "pool": [{"bl": "Apply", "q": "What does this print?", "c": "int sq(int x) { return x * x; }\n...\nprintf(\"%d\", sq(2 + 1));", "o": ["9", "5", "7", "3"], "a": 0, "w": "The argument 2 + 1 is evaluated first, so x is 3 and the result is 9."}, {"bl": "Apply", "q": "What does main print?", "c": "void f(int x) { x = x * 2; }\nint main(void) {\n    int a = 5;\n    f(a);\n    printf(\"%d\", a);\n}", "o": ["5", "10", "0", "Garbage"], "a": 0, "w": "f receives a copy of a. Doubling the copy does not change a."}, {"bl": "Apply", "q": "What does main print?", "c": "void f(int *x) { *x = *x * 2; }\nint main(void) {\n    int a = 5;\n    f(&a);\n    printf(\"%d\", a);\n}", "o": ["5", "10", "25", "An address"], "a": 1, "w": "f receives the address of a and writes through it, so a becomes 10."}, {"bl": "Analyse", "q": "What does main print?", "c": "int x = 1;\nvoid g(void) { int x = 5; x++; }\nint main(void) {\n    g();\n    printf(\"%d\", x);\n}", "o": ["1", "5", "6", "2"], "a": 0, "w": "g changes its own local x, which hides the global one. The global x is still 1."}, {"bl": "Apply", "q": "Which prototype matches the call float r = avg(marks, 5); where marks is an int array?", "o": ["int avg(int a, int n);", "float avg(int a[], int n);", "float avg(int a[]);", "void avg(int a[], int n);"], "a": 1, "w": "It must return a float and take an array plus its size."}, {"bl": "Apply", "q": "What does f(472) return?", "c": "int f(int n) {\n    if (n == 0) return 0;\n    return n % 10 + f(n / 10);\n}", "o": ["13", "472", "7", "274"], "a": 0, "w": "It adds the digits: 2 + 7 + 4 + 0 = 13."}, {"bl": "Apply", "q": "What does p(5) return?", "c": "int p(int n) {\n    if (n <= 1) return 1;\n    return 2 * p(n - 1);\n}", "o": ["10", "16", "32", "25"], "a": 1, "w": "p(1) = 1, then each level doubles: 2, 4, 8, 16."}, {"bl": "Analyse", "q": "What does r(3) print?", "c": "void r(int n) {\n    if (n == 0) return;\n    r(n - 1);\n    printf(\"%d \", n);\n}", "o": ["3 2 1", "1 2 3", "3", "0 1 2 3"], "a": 1, "w": "The printf runs after the recursive call returns, so the smallest value prints first."}, {"bl": "Evaluate", "q": "A recursive function has no base case. What happens when it runs?", "o": ["It returns 0", "Calls pile up until the stack overflows and the program crashes", "The compiler rejects it", "It runs exactly once"], "a": 1, "w": "Each call adds a stack frame; without a stopping point, memory runs out."}, {"bl": "Apply", "q": "What does main print?", "c": "void z(int a[]) { a[0] = 0; }\nint main(void) {\n    int a[2] = {5, 6};\n    z(a);\n    printf(\"%d\", a[0]);\n}", "o": ["5", "0", "6", "Compile error"], "a": 1, "w": "Arrays are passed as the address of their first element, so z changes the original."}, {"bl": "Apply", "q": "What does this print?", "c": "int x = 5, *p = &x;\n*p = *p + 3;\nprintf(\"%d %d\", x, *p);", "o": ["5 8", "8 8", "8 5", "5 5"], "a": 1, "w": "*p is x itself, so x becomes 8 and *p reads 8."}, {"bl": "Analyse", "q": "What does this print?", "c": "int a[] = {10, 20, 30};\nint *p = a;\np++;\nprintf(\"%d\", *p + 1);", "o": ["11", "21", "30", "31"], "a": 1, "w": "After p++, p points at a[1] = 20. *p + 1 adds 1 to the value: 21."}, {"bl": "Analyse", "q": "What does this print?", "c": "int a[] = {10, 20, 30, 40};\nint *p = a + 3;\nprintf(\"%d\", *(p - 2));", "o": ["10", "20", "30", "38"], "a": 1, "w": "p points at a[3]; p − 2 points at a[1], which is 20."}, {"bl": "Apply", "q": "int a[6]; int *p = &a[1], *q = &a[4]; What is q − p?", "o": ["3", "12", "4", "16"], "a": 0, "w": "Pointer difference counts elements, not bytes: 4 − 1 = 3."}, {"bl": "Apply", "q": "double *d holds the address 1000. What address is d + 2? (double is 8 bytes)", "o": ["1002", "1008", "1016", "1004"], "a": 2, "w": "Each step moves sizeof(double) = 8 bytes: 1000 + 16 = 1016."}, {"bl": "Apply", "q": "What does this print?", "c": "char *s = \"CODE\";\nprintf(\"%c\", *(s + 3));", "o": ["C", "D", "E", "O"], "a": 2, "w": "s + 3 points at index 3 of \"CODE\", which is E."}, {"bl": "Understand", "q": "Which expression is the same as a[i][j] for a 2-D array a?", "o": ["*(a + i + j)", "*(*(a + i) + j)", "**a + i + j", "*(a[j] + i)"], "a": 1, "w": "Move to row i, then to column j within that row, then dereference."}, {"bl": "Analyse", "q": "What does this print?", "c": "struct pt { int x, y; };\nstruct pt a = {2, 3}, b;\nb = a;\nb.x = 9;\nprintf(\"%d\", a.x);", "o": ["2", "9", "3", "Compile error"], "a": 0, "w": "b = a copies every member. Changing b afterwards does not affect a."}, {"bl": "Understand", "q": "p is a pointer to a structure with a member marks. Which expression is the same as p->marks?", "o": ["*p.marks", "(*p).marks", "p.marks", "&p.marks"], "a": 1, "w": "The arrow is shorthand for dereference, then member. The brackets are needed because . outranks *."}, {"bl": "Analyse", "q": "What does this print?", "c": "struct st { int roll, marks; };\nstruct st c[3] = {{1, 50}, {2, 80}, {3, 65}};\nint t = 0;\nfor (int i = 1; i < 3; i++)\n    if (c[i].marks > c[t].marks) t = i;\nprintf(\"%d\", c[t].roll);", "o": ["1", "2", "3", "80"], "a": 1, "w": "The loop finds the index of the highest marks (80, at index 1) and prints that student’s roll number, 2."}, {"bl": "Apply", "q": "Employee e has a member dob, a structure with a member year. How do you read the year?", "o": ["e.year", "e.dob.year", "e->dob->year", "dob.e.year"], "a": 1, "w": "Chain the dots from the outer structure to the inner member."}, {"bl": "Evaluate", "q": "A program must add today’s entry to log.txt without losing earlier entries. Which mode?", "o": ["\"r\"", "\"w\"", "\"a\"", "\"r+\""], "a": 2, "w": "Append mode keeps the existing contents and writes at the end."}, {"bl": "Understand", "q": "fopen(\"data.txt\", \"r\") is called but data.txt does not exist. What does fopen return?", "o": ["An empty file", "NULL", "EOF", "0 bytes"], "a": 1, "w": "Read mode needs an existing file. Always check for NULL before using the pointer."}, {"bl": "Analyse", "q": "Why is the result of fgetc stored in an int, not a char?", "o": ["int is faster", "So the end-of-file value EOF can be told apart from real characters", "fgetc only works with int files", "char cannot hold letters"], "a": 1, "w": "EOF is a value outside the range of characters (usually −1). A char variable could confuse it with a real byte."}, {"bl": "Evaluate", "q": "marks.txt holds 100 lines. A program opens it with \"w\" and writes one line. How many lines does it hold now?", "o": ["101", "1", "100", "0"], "a": 1, "w": "\"w\" erases an existing file when it opens it, before anything is written."}]};
PPS.WQ.a3=[
 {
  "id": "W1",
  "co": "CO4",
  "bl": "Apply",
  "marks": "5",
  "q": "Write a function int isPerfect(int n) that returns 1 if n is a perfect number (the sum of its proper divisors equals n, for example 6 = 1 + 2 + 3) and 0 otherwise. Use it in main to print all perfect numbers from 1 to 1000.",
  "code": "#include <stdio.h>\nint isPerfect(int n);\n\nint main(void)\n{\n    for (int k = 1; k <= 1000; k++)\n        if (isPerfect(k))\n            printf(\"%d \", k);\n    printf(\"\\n\");\n    return 0;\n}\n\nint isPerfect(int n)\n{\n    int sum = 0;\n    for (int d = 1; d < n; d++)\n        if (n % d == 0)\n            sum += d;\n    return n > 1 && sum == n;\n}",
  "note": "Output: 6 28 496. The divisor loop stops before n because only proper divisors count.",
  "scheme": [
   [
    "1",
    "Correct prototype and function header with int return type"
   ],
   [
    "2",
    "Loop that adds every proper divisor"
   ],
   [
    "1",
    "Returns 1 or 0 correctly (and excludes 1)"
   ],
   [
    "1",
    "main loops from 1 to 1000 and calls the function"
   ]
  ]
 },
 {
  "id": "W2",
  "co": "CO4",
  "bl": "Understand, Apply",
  "marks": "2 + 3",
  "q": "(a) Explain the difference between call by value and call by reference, with a one-line example of each. (2 marks)\n(b) Write a function that swaps two integers using pointers, and show how main calls it. (3 marks)",
  "code": "#include <stdio.h>\nvoid swap(int *x, int *y)\n{\n    int t = *x;\n    *x = *y;\n    *y = t;\n}\n\nint main(void)\n{\n    int a = 1, b = 2;\n    swap(&a, &b);             /* pass addresses */\n    printf(\"%d %d\\n\", a, b);  /* prints 2 1 */\n    return 0;\n}",
  "note": "(a) In call by value the function receives copies, so changes stay inside it: f(a) cannot change a. In call by reference the function receives addresses and changes the caller’s variables through them: g(&a) can change a.",
  "scheme": [
   [
    "1",
    "(a) Value: a copy is passed, the original is unchanged, with example"
   ],
   [
    "1",
    "(a) Reference: the address is passed, the original can change, with example"
   ],
   [
    "2",
    "(b) Pointer parameters and swapping *x and *y through a temporary"
   ],
   [
    "1",
    "(b) Correct call with &a and &b"
   ]
  ]
 },
 {
  "id": "W3",
  "co": "CO4",
  "bl": "Apply",
  "marks": "5",
  "q": "Write a recursive function int fib(int n) that returns the nth Fibonacci number (fib(0) = 0, fib(1) = 1). Use it to print the first n terms, where n is read from the user.",
  "code": "#include <stdio.h>\nint fib(int n)\n{\n    if (n <= 1)                     /* base case */\n        return n;\n    return fib(n - 1) + fib(n - 2); /* recursive case */\n}\n\nint main(void)\n{\n    int n;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        printf(\"%d \", fib(i));\n    printf(\"\\n\");\n    return 0;\n}",
  "note": "For n = 8 the output is 0 1 1 2 3 5 8 13.",
  "scheme": [
   [
    "1",
    "Base case for n = 0 and n = 1"
   ],
   [
    "2",
    "Recursive case fib(n − 1) + fib(n − 2)"
   ],
   [
    "1",
    "Reads n"
   ],
   [
    "1",
    "Loop calls fib and prints n terms"
   ]
  ],
  "sample": [
   "8\n",
   "0 1 1 2 3 5 8 13 \n"
  ]
 },
 {
  "id": "W4",
  "co": "CO4",
  "bl": "Apply",
  "marks": "5",
  "q": "Write a function void stats(int a[], int n, int *max, int *min, float *avg) that finds the largest value, smallest value and average of an array in a single loop. Show the call from main.",
  "code": "#include <stdio.h>\nvoid stats(int a[], int n, int *max, int *min, float *avg)\n{\n    int sum = a[0];\n    *max = *min = a[0];\n    for (int i = 1; i < n; i++) {\n        if (a[i] > *max) *max = a[i];\n        if (a[i] < *min) *min = a[i];\n        sum += a[i];\n    }\n    *avg = (float)sum / n;\n}\n\nint main(void)\n{\n    int n, a[100], hi, lo;\n    float av;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) scanf(\"%d\", &a[i]);\n    stats(a, n, &hi, &lo, &av);\n    printf(\"Max %d, Min %d, Average %.2f\\n\", hi, lo, av);\n    return 0;\n}",
  "note": "Three results are returned through pointer parameters, because return can send back only one value.",
  "scheme": [
   [
    "1",
    "Correct header with an array and three pointer parameters"
   ],
   [
    "2",
    "One loop updating *max, *min and the sum"
   ],
   [
    "1",
    "Average computed with a cast, not integer division"
   ],
   [
    "1",
    "Call passes the array and &hi, &lo, &av"
   ]
  ],
  "sample": [
   "5\n12 7 25 3 18\n",
   "Max 25, Min 3, Average 13.00\n"
  ]
 },
 {
  "id": "W5",
  "co": "CO4",
  "bl": "Analyse",
  "marks": "5",
  "q": "Trace the call f(7) for the function below. Show every call and the value it returns, give the final result, and state in one sentence what the function computes.",
  "code": "f(7) = 7 + f(5)\nf(5) = 5 + f(3)\nf(3) = 3 + f(1)\nf(1) = 1 + f(-1)\nf(-1) = 0              (base case)\n\nUnwinding: f(1) = 1, f(3) = 4, f(5) = 9, f(7) = 16",
  "note": "f(7) = 16. The function adds n, n − 2, n − 4 and so on down to 1 or 2: for odd n it is the sum of the odd numbers up to n.",
  "scheme": [
   [
    "2",
    "All calls listed in order down to the base case"
   ],
   [
    "1",
    "Values returned correctly while unwinding"
   ],
   [
    "1",
    "Final answer 16"
   ],
   [
    "1",
    "Correct description of what f computes"
   ]
  ],
  "qcode": "int f(int n)\n{\n    if (n <= 0)\n        return 0;\n    return n + f(n - 2);\n}",
  "plain": true
 },
 {
  "id": "W6",
  "co": "CO4",
  "bl": "Create",
  "marks": "5",
  "q": "Write a function void transpose(int m[][10], int n) that transposes a square matrix in place (without a second matrix), and a function to print a matrix. In main, read n and the matrix, then print it after transposing.",
  "code": "#include <stdio.h>\nvoid transpose(int m[][10], int n)\n{\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++) {   /* upper triangle only */\n            int t = m[i][j];\n            m[i][j] = m[j][i];\n            m[j][i] = t;\n        }\n}\n\nvoid print(int m[][10], int n)\n{\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++)\n            printf(\"%4d\", m[i][j]);\n        printf(\"\\n\");\n    }\n}\n\nint main(void)\n{\n    int n, m[10][10];\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < n; j++)\n            scanf(\"%d\", &m[i][j]);\n    transpose(m, n);\n    print(m, n);\n    return 0;\n}",
  "note": "Starting j at i + 1 swaps each pair once. Looping j over the whole row would swap every pair twice and undo the transpose.",
  "scheme": [
   [
    "1",
    "Parameter written with the column size, int m[][10]"
   ],
   [
    "2",
    "Swaps only the upper triangle, through a temporary"
   ],
   [
    "1",
    "Separate print function with nested loops"
   ],
   [
    "1",
    "main reads the matrix and calls both functions"
   ]
  ],
  "sample": [
   "3\n1 2 3\n4 5 6\n7 8 9\n",
   "   1   4   7\n   2   5   8\n   3   6   9\n"
  ]
 },
 {
  "id": "W7",
  "co": "CO5",
  "bl": "Apply",
  "marks": "5",
  "q": "Define struct book with id, title (one word) and price. Read n books into an array of structures, then print the details of the costliest book and the average price.",
  "code": "#include <stdio.h>\nstruct book {\n    int id;\n    char title[30];\n    float price;\n};\n\nint main(void)\n{\n    struct book b[50];\n    int n, top = 0;\n    float sum = 0;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d %29s %f\", &b[i].id, b[i].title, &b[i].price);\n        sum += b[i].price;\n        if (b[i].price > b[top].price) top = i;\n    }\n    printf(\"Costliest: %d %s %.2f\\n\", b[top].id, b[top].title, b[top].price);\n    printf(\"Average price: %.2f\\n\", sum / n);\n    return 0;\n}",
  "note": "title is an array, so it takes no & in scanf; id and price do.",
  "scheme": [
   [
    "1",
    "Correct structure definition, ending with a semicolon"
   ],
   [
    "1",
    "Array of structures read in a loop with correct scanf"
   ],
   [
    "2",
    "Finds the costliest book and keeps its index"
   ],
   [
    "1",
    "Prints its details and the average"
   ]
  ],
  "sample": [
   "3\n11 Algorithms 450\n12 Networks 380.5\n13 Compilers 520\n",
   "Costliest: 13 Compilers 520.00\nAverage price: 450.17\n"
  ]
 },
 {
  "id": "W8",
  "co": "CO5",
  "bl": "Understand, Apply",
  "marks": "2 + 3",
  "q": "(a) When do you use s.m and when p->m? Give an example of each. (2 marks)\n(b) Write a function void applyDiscount(struct product *p, float pct) that reduces a product’s price by pct percent, and show the call from main. (3 marks)",
  "code": "#include <stdio.h>\nstruct product {\n    int id;\n    float price;\n};\n\nvoid applyDiscount(struct product *p, float pct)\n{\n    p->price = p->price * (100 - pct) / 100;\n}\n\nint main(void)\n{\n    struct product x = {7, 500};\n    applyDiscount(&x, 10);\n    printf(\"%d %.2f\\n\", x.id, x.price);   /* 7 450.00 */\n    return 0;\n}",
  "note": "(a) Use the dot with a structure variable: s.marks = 90;. Use the arrow with a pointer to a structure: p->marks = 90;, which means (*p).marks.",
  "scheme": [
   [
    "1",
    "(a) Dot for structure variables, with example"
   ],
   [
    "1",
    "(a) Arrow for pointers, equal to (*p).m, with example"
   ],
   [
    "2",
    "(b) Function updates p->price correctly"
   ],
   [
    "1",
    "(b) Call passes &x"
   ]
  ]
 },
 {
  "id": "W9",
  "co": "CO5",
  "bl": "Apply",
  "marks": "5",
  "q": "Read 5 integers into an array. Then, using only a pointer (no [ ] after reading), print them in reverse order and print their sum.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int a[5], sum = 0;\n    for (int i = 0; i < 5; i++)\n        scanf(\"%d\", &a[i]);\n    for (int *p = a + 4; p >= a; p--) {\n        printf(\"%d \", *p);\n        sum += *p;\n    }\n    printf(\"\\nSum = %d\\n\", sum);\n    return 0;\n}",
  "note": "a + 4 is the address of the last element. Each p-- moves back one int (4 bytes).",
  "scheme": [
   [
    "1",
    "Reads the array"
   ],
   [
    "2",
    "Pointer starts at a + 4 and moves back with p--"
   ],
   [
    "1",
    "Uses *p to print and add"
   ],
   [
    "1",
    "Loop stops correctly at a"
   ]
  ],
  "sample": [
   "4 9 1 7 3\n",
   "3 7 1 9 4 \nSum = 24\n"
  ]
 },
 {
  "id": "W10",
  "co": "CO5",
  "bl": "Analyse",
  "marks": "5",
  "q": "Predict the output of this code, and explain how each line got its value.",
  "code": "25\n20\n2\n15",
  "note": "Line 1: *p is a[0] = 5 and *q is a[3] = 20, so 25. Line 2: after p++, *p is a[1] = 10, doubled is 20. Line 3: q − p counts elements between a[1] and a[3], which is 2. Line 4: q − 1 points at a[2] = 15.",
  "scheme": [
   [
    "1",
    "First line 25"
   ],
   [
    "1",
    "Second line 20"
   ],
   [
    "1",
    "Third line 2 (elements, not bytes)"
   ],
   [
    "1",
    "Fourth line 15"
   ],
   [
    "1",
    "Explanation of how pointer arithmetic scales by element"
   ]
  ],
  "qcode": "int a[] = {5, 10, 15, 20};\nint *p = a, *q = a + 3;\nprintf(\"%d\\n\", *p + *q);\np++;\nprintf(\"%d\\n\", *p * 2);\nprintf(\"%d\\n\", (int)(q - p));\nprintf(\"%d\\n\", *(q - 1));",
  "plain": true
 },
 {
  "id": "W11",
  "co": "CO5",
  "bl": "Apply",
  "marks": "5",
  "q": "Write a program that reads the text file input.txt and writes a copy called upper.txt with every letter in uppercase. Print how many lines were copied. Handle a missing input file.",
  "code": "#include <stdio.h>\n#include <ctype.h>\nint main(void)\n{\n    FILE *in = fopen(\"input.txt\", \"r\");\n    if (in == NULL) { printf(\"Cannot open input.txt\\n\"); return 1; }\n    FILE *out = fopen(\"upper.txt\", \"w\");\n    if (out == NULL) { printf(\"Cannot create upper.txt\\n\"); fclose(in); return 1; }\n    int ch, lines = 0;\n    while ((ch = fgetc(in)) != EOF) {\n        fputc(toupper(ch), out);\n        if (ch == '\\n') lines++;\n    }\n    fclose(in);\n    fclose(out);\n    printf(\"Copied %d lines\\n\", lines);\n    return 0;\n}",
  "note": "toupper from ctype.h converts letters and leaves everything else unchanged.",
  "scheme": [
   [
    "1",
    "Opens input with \"r\" and output with \"w\", checking for NULL"
   ],
   [
    "2",
    "fgetc and fputc loop until EOF, using an int"
   ],
   [
    "1",
    "Converts to uppercase and counts newlines"
   ],
   [
    "1",
    "Closes both files"
   ]
  ],
  "sample": [
   "input.txt:\nhello file\nC is fun\n",
   "Copied 2 lines\n"
  ]
 },
 {
  "id": "W12",
  "co": "CO5",
  "bl": "Create",
  "marks": "5",
  "q": "Using struct student (roll, name, marks), read n records and write them to students.txt with fprintf. Close the file, reopen it for reading, and print the students with marks of 60 or more.",
  "code": "#include <stdio.h>\nstruct student {\n    int roll;\n    char name[20];\n    int marks;\n};\n\nint main(void)\n{\n    struct student s;\n    int n;\n    FILE *fp = fopen(\"students.txt\", \"w\");\n    if (fp == NULL) { printf(\"Cannot create file\\n\"); return 1; }\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d %19s %d\", &s.roll, s.name, &s.marks);\n        fprintf(fp, \"%d %s %d\\n\", s.roll, s.name, s.marks);\n    }\n    fclose(fp);\n\n    fp = fopen(\"students.txt\", \"r\");\n    if (fp == NULL) { printf(\"Cannot open file\\n\"); return 1; }\n    while (fscanf(fp, \"%d %19s %d\", &s.roll, s.name, &s.marks) == 3)\n        if (s.marks >= 60)\n            printf(\"%d %s %d\\n\", s.roll, s.name, s.marks);\n    fclose(fp);\n    return 0;\n}",
  "note": "The file is closed after writing so the data is saved before it is read back.",
  "scheme": [
   [
    "1",
    "Structure definition"
   ],
   [
    "1",
    "Writes each record with fprintf in \"w\" mode"
   ],
   [
    "1",
    "Closes and reopens in \"r\" mode, checking NULL"
   ],
   [
    "2",
    "fscanf loop that stops at end of file and prints marks >= 60"
   ]
  ],
  "sample": [
   "3\n101 Asha 72\n102 Ravi 55\n103 Meena 64\n",
   "101 Asha 72\n103 Meena 64\n"
  ]
 }
];
