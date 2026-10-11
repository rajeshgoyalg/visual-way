/* Self-directed learning projects (course plan page 6). Every reference solution was compiled with
   gcc -Wall -Wextra and run on its sample input; the expected output is that run. */
PPS.SDL=[
 {
  "n": 1,
  "hours": 2,
  "title": "Student Marks Management System",
  "plan": "Design and implement a Student Marks Management System in C to analyze academic performance by computing totals, averages, ranks, and statistical summaries using one-dimensional arrays.",
  "brief": "Read the marks of n students into an array. Print the class total, average, median, the highest and lowest marks with the student number, how many students are above average, and each student’s rank (equal marks share a rank).",
  "extend": "Add the standard deviation, or a bar of * characters per student to make a text histogram.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int n, m[100], s[100], total = 0;\n    scanf(\"%d\", &n);\n    if (n < 1 || n > 100) { printf(\"n must be 1 to 100\\n\"); return 0; }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d\", &m[i]);\n        total += m[i];\n        s[i] = m[i];                         /* copy for sorting */\n    }\n    float avg = (float)total / n;\n    int hi = 0, lo = 0, above = 0;\n    for (int i = 1; i < n; i++) {\n        if (m[i] > m[hi]) hi = i;\n        if (m[i] < m[lo]) lo = i;\n    }\n    for (int i = 0; i < n; i++)\n        if (m[i] > avg) above++;\n    for (int i = 0; i < n - 1; i++)          /* bubble sort the copy */\n        for (int j = 0; j < n - 1 - i; j++)\n            if (s[j] > s[j + 1]) { int t = s[j]; s[j] = s[j + 1]; s[j + 1] = t; }\n    float median = (n % 2) ? s[n / 2] : (s[n / 2 - 1] + s[n / 2]) / 2.0f;\n    printf(\"Total %d, Average %.2f, Median %.1f\\n\", total, avg, median);\n    printf(\"Highest %d (student %d), Lowest %d (student %d)\\n\", m[hi], hi + 1, m[lo], lo + 1);\n    printf(\"%d of %d students are above average\\n\", above, n);\n    printf(\"Student  Marks  Rank\\n\");\n    for (int i = 0; i < n; i++) {\n        int rank = 1;\n        for (int j = 0; j < n; j++)\n            if (m[j] > m[i]) rank++;\n        printf(\"%7d  %5d  %4d\\n\", i + 1, m[i], rank);\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l1",
    "3.1 One-dimensional arrays"
   ],
   [
    "u3l3",
    "3.3 Sorting"
   ]
  ],
  "milestones": [
   [
    "Read n and the n marks into an array, checking that n is between 1 and 100.",
    "Declare int m[100]. Loop i from 0 to n − 1 with scanf(\"%d\", &m[i])."
   ],
   [
    "Compute the total and the average, and find the highest and lowest marks in one loop.",
    "Keep the index of the best and worst so far, not just the value, so you can print the student number."
   ],
   [
    "Find the median: sort a copy of the array and take the middle value (or the average of the two middle values).",
    "Sort a copy, not the original, or the student numbers no longer match the marks."
   ],
   [
    "Print each student’s rank: 1 + the number of students who scored more.",
    "A nested loop counts the higher scores. Equal marks then share a rank automatically."
   ]
  ],
  "stdin": "6\n72 85 64 90 58 85\n",
  "out": "Total 454, Average 75.67, Median 78.5\nHighest 90 (student 4), Lowest 58 (student 5)\n3 of 6 students are above average\nStudent  Marks  Rank\n      1     72     4\n      2     85     2\n      3     64     5\n      4     90     1\n      5     58     6\n      6     85     2\n"
 },
 {
  "n": 2,
  "hours": 2,
  "title": "Grade Evaluation System",
  "plan": "Develop a Grade Evaluation System that processes marks in multiple subjects and automatically generates grades, percentages, and pass/fail reports using decision-making constructs.",
  "brief": "Read n students, each with a one-word name and marks in k subjects (out of 100). For each student print the total, percentage, grade and PASS or FAIL. A student fails if any subject is below 40. Finish with a class summary.",
  "extend": "Add the class topper and the subject-wise average.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int n, k, marks[50][6], pass = 0, count[7] = {0};\n    char name[50][20];\n    char grades[7][3] = {\"A+\", \"A\", \"B\", \"C\", \"D\", \"E\", \"F\"};\n    scanf(\"%d %d\", &n, &k);\n    for (int i = 0; i < n; i++) {\n        scanf(\"%19s\", name[i]);\n        for (int j = 0; j < k; j++)\n            scanf(\"%d\", &marks[i][j]);\n    }\n    printf(\"%-10s %5s %6s %5s  %s\\n\", \"Name\", \"Total\", \"Pct\", \"Grade\", \"Result\");\n    for (int i = 0; i < n; i++) {\n        int total = 0, failed = 0, g;\n        for (int j = 0; j < k; j++) {\n            total += marks[i][j];\n            if (marks[i][j] < 40) failed = 1;\n        }\n        float pct = (float)total / k;\n        if (failed) g = 6;\n        else if (pct >= 90) g = 0;\n        else if (pct >= 80) g = 1;\n        else if (pct >= 70) g = 2;\n        else if (pct >= 60) g = 3;\n        else if (pct >= 50) g = 4;\n        else g = 5;\n        count[g]++;\n        if (!failed) pass++;\n        printf(\"%-10s %5d %6.2f %5s  %s\\n\", name[i], total, pct, grades[g], failed ? \"FAIL\" : \"PASS\");\n    }\n    printf(\"Passed %d of %d. Grades:\", pass, n);\n    for (int g = 0; g < 7; g++)\n        if (count[g]) printf(\" %s=%d\", grades[g], count[g]);\n    printf(\"\\n\");\n    return 0;\n}",
  "concepts": [
   [
    "u2l5",
    "2.5 Making decisions"
   ],
   [
    "u3l4",
    "3.4 Two-dimensional arrays"
   ]
  ],
  "milestones": [
   [
    "Store names in char name[50][20] and marks in a 2-D array int marks[50][6].",
    "Row i holds student i; column j holds subject j."
   ],
   [
    "For each student, add the k marks and flag a failure if any subject is below 40.",
    "Use a flag variable set to 0 before the inner loop."
   ],
   [
    "Turn the percentage into a grade with an else-if ladder: A+ ≥ 90, A ≥ 80, B ≥ 70, C ≥ 60, D ≥ 50, E below that, and F for a failed subject.",
    "Check the failure flag first, then the percentages from the top down."
   ],
   [
    "Print a neat table and a summary: how many passed and how many got each grade.",
    "Keep a count array with one slot per grade."
   ]
  ],
  "stdin": "4 3\nAsha 92 88 95\nRavi 45 38 70\nMeena 78 82 74\nKiran 55 61 49\n",
  "out": "Name       Total    Pct Grade  Result\nAsha         275  91.67    A+  PASS\nRavi         153  51.00     F  FAIL\nMeena        234  78.00     B  PASS\nKiran        165  55.00     D  PASS\nPassed 3 of 4. Grades: A+=1 B=1 D=1 F=1\n"
 },
 {
  "n": 3,
  "hours": 3,
  "title": "Student Record Retrieval Application",
  "plan": "Construct a Student Record Retrieval Application that utilizes Linear Search to efficiently locate and display student information based on user-defined search criteria.",
  "brief": "Store records of roll number, name and marks. Then answer queries until Q: R roll (find by roll number), N name (all students with that name) and M marks (all students with at least those marks). Print the number of comparisons for each query.",
  "extend": "Add a search by name prefix, such as every name starting with \"Ra\".",
  "code": "#include <stdio.h>\n#include <string.h>\nint main(void)\n{\n    int n, roll[100], marks[100];\n    char name[100][20], type;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        scanf(\"%d %19s %d\", &roll[i], name[i], &marks[i]);\n    while (scanf(\" %c\", &type) == 1 && type != 'Q') {\n        int found = 0, comps = 0;\n        if (type == 'R') {\n            int key;\n            scanf(\"%d\", &key);\n            for (int i = 0; i < n; i++) {\n                comps++;\n                if (roll[i] == key) {\n                    printf(\"Found: %d %s %d\\n\", roll[i], name[i], marks[i]);\n                    found = 1;\n                    break;                    /* roll numbers are unique */\n                }\n            }\n        } else if (type == 'N') {\n            char key[20];\n            scanf(\"%19s\", key);\n            for (int i = 0; i < n; i++) {\n                comps++;\n                if (strcmp(name[i], key) == 0) {\n                    printf(\"Found: %d %s %d\\n\", roll[i], name[i], marks[i]);\n                    found++;\n                }\n            }\n        } else if (type == 'M') {\n            int min;\n            scanf(\"%d\", &min);\n            for (int i = 0; i < n; i++) {\n                comps++;\n                if (marks[i] >= min) {\n                    printf(\"Match: %d %s %d\\n\", roll[i], name[i], marks[i]);\n                    found++;\n                }\n            }\n        } else {\n            printf(\"Unknown query %c\\n\", type);\n            continue;\n        }\n        if (!found) printf(\"No matching record\\n\");\n        printf(\"(%d comparisons)\\n\", comps);\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l2",
    "3.2 Searching"
   ],
   [
    "u3l6",
    "3.6 String functions"
   ]
  ],
  "milestones": [
   [
    "Read n records into parallel arrays: int roll[100], char name[100][20], int marks[100].",
    "Index i in every array belongs to the same student."
   ],
   [
    "Loop reading a query letter with scanf(\" %c\", &type) until it is Q.",
    "The space before %c skips the newline left by the previous input."
   ],
   [
    "Search by roll with linear search and stop at the first match; search by name with strcmp and report every match.",
    "Roll numbers are unique, so break; names may repeat, so keep going."
   ],
   [
    "Count comparisons and print \"No matching record\" when nothing is found.",
    "A found counter does double duty: it tells you whether anything matched."
   ]
  ],
  "stdin": "5\n101 Asha 88\n102 Ravi 64\n103 Meena 79\n104 Kiran 91\n105 Ravi 72\nR 103\nN Ravi\nM 85\nR 110\nQ\n",
  "out": "Found: 103 Meena 79\n(3 comparisons)\nFound: 102 Ravi 64\nFound: 105 Ravi 72\n(5 comparisons)\nMatch: 101 Asha 88\nMatch: 104 Kiran 91\n(5 comparisons)\nNo matching record\n(5 comparisons)\n"
 },
 {
  "n": 4,
  "hours": 3,
  "title": "Linear vs Binary Search on Student Records",
  "plan": "Implement and compare Linear Search and Binary Search techniques on sorted datasets to evaluate their effectiveness in retrieving student records.",
  "brief": "Read n roll numbers (sorting them if needed), then q search keys. For every key, run both linear and binary search, count the comparisons each needs, and print a comparison table with the averages.",
  "extend": "Repeat with 1,000 roll numbers generated in a loop and see how far apart the averages become.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int n, a[200], q, totL = 0, totB = 0;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        scanf(\"%d\", &a[i]);\n    for (int i = 0; i < n - 1; i++)          /* binary search needs sorted data */\n        for (int j = 0; j < n - 1 - i; j++)\n            if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }\n    scanf(\"%d\", &q);\n    printf(\"%6s %8s %8s  %s\\n\", \"Key\", \"Linear\", \"Binary\", \"Result\");\n    for (int k = 0; k < q; k++) {\n        int key, lc = 0, bc = 0, pos = -1;\n        scanf(\"%d\", &key);\n        for (int i = 0; i < n; i++) {         /* linear search */\n            lc++;\n            if (a[i] == key) { pos = i; break; }\n        }\n        int low = 0, high = n - 1;            /* binary search */\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            bc++;\n            if (a[mid] == key) break;\n            if (key < a[mid]) high = mid - 1;\n            else low = mid + 1;\n        }\n        totL += lc;\n        totB += bc;\n        printf(\"%6d %8d %8d  %s\\n\", key, lc, bc, pos >= 0 ? \"found\" : \"not found\");\n    }\n    printf(\"Average comparisons: linear %.1f, binary %.1f\\n\", (float)totL / q, (float)totB / q);\n    return 0;\n}",
  "concepts": [
   [
    "u3l2",
    "3.2 Searching"
   ],
   [
    "u3l3",
    "3.3 Sorting"
   ]
  ],
  "milestones": [
   [
    "Read the roll numbers and make sure they are sorted.",
    "Binary search gives wrong answers on unsorted data, so sort first if needed."
   ],
   [
    "For each key, run linear search and count comparisons until found or the end.",
    "Count inside the loop, before the if."
   ],
   [
    "Run binary search on the same key and count how many middle elements are checked.",
    "Use low <= high, and move high to mid − 1 or low to mid + 1."
   ],
   [
    "Print the table and the average comparisons for each method, then explain the difference.",
    "Try keys at the start, middle and end, and one that is missing."
   ]
  ],
  "stdin": "16\n1001 1003 1005 1007 1009 1011 1013 1015 1017 1019 1021 1023 1025 1027 1029 1031\n5\n1001 1015 1031 1020 1029\n",
  "out": "   Key   Linear   Binary  Result\n  1001        1        4  found\n  1015        8        1  found\n  1031       16        5  found\n  1020       16        4  not found\n  1029       15        4  found\nAverage comparisons: linear 11.2, binary 3.6\n"
 },
 {
  "n": 5,
  "hours": 3,
  "title": "Product Inventory Management System",
  "plan": "Create a Product Inventory Management System using arrays and strings to maintain product details, stock information, and pricing records.",
  "brief": "Keep products in parallel arrays (id, name, quantity, price) and process commands until Q: A adds a product, S changes stock, L lists everything, V prints the total stock value and W lists products below a stock threshold.",
  "extend": "Add a command that deletes a product by shifting the later elements left.",
  "code": "#include <stdio.h>\n#include <string.h>\nint main(void)\n{\n    int id[100], qty[100], n = 0;\n    float price[100];\n    char name[100][20], cmd;\n    while (scanf(\" %c\", &cmd) == 1 && cmd != 'Q') {\n        if (cmd == 'A') {\n            int newId, q, dup = 0;\n            char nm[20];\n            float p;\n            scanf(\"%d %19s %d %f\", &newId, nm, &q, &p);\n            for (int i = 0; i < n; i++)\n                if (id[i] == newId) dup = 1;\n            if (dup) printf(\"Product %d already exists\\n\", newId);\n            else if (n == 100) printf(\"Inventory is full\\n\");\n            else {\n                id[n] = newId; strcpy(name[n], nm); qty[n] = q; price[n] = p;\n                n++;\n                printf(\"Added %s\\n\", nm);\n            }\n        } else if (cmd == 'S') {\n            int key, change, i = 0;\n            scanf(\"%d %d\", &key, &change);\n            while (i < n && id[i] != key) i++;\n            if (i == n) printf(\"No product %d\\n\", key);\n            else if (qty[i] + change < 0) printf(\"Not enough %s in stock (%d)\\n\", name[i], qty[i]);\n            else { qty[i] += change; printf(\"%s stock is now %d\\n\", name[i], qty[i]); }\n        } else if (cmd == 'L') {\n            printf(\"%-4s %-12s %5s %9s\\n\", \"ID\", \"Name\", \"Qty\", \"Price\");\n            for (int i = 0; i < n; i++)\n                printf(\"%-4d %-12s %5d %9.2f\\n\", id[i], name[i], qty[i], price[i]);\n        } else if (cmd == 'V') {\n            float value = 0;\n            for (int i = 0; i < n; i++) value += qty[i] * price[i];\n            printf(\"Total stock value: %.2f\\n\", value);\n        } else if (cmd == 'W') {\n            int limit, c = 0;\n            scanf(\"%d\", &limit);\n            printf(\"Below %d:\", limit);\n            for (int i = 0; i < n; i++)\n                if (qty[i] < limit) { printf(\" %s(%d)\", name[i], qty[i]); c++; }\n            printf(c ? \"\\n\" : \" none\\n\");\n        } else {\n            printf(\"Unknown command %c\\n\", cmd);\n        }\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l1",
    "3.1 One-dimensional arrays"
   ],
   [
    "u3l5",
    "3.5 Strings"
   ],
   [
    "u2l5",
    "2.5 switch and else-if"
   ]
  ],
  "milestones": [
   [
    "Read commands in a loop with scanf(\" %c\", &cmd) and handle Q to stop.",
    "An else-if chain (or switch) picks the action for each command letter."
   ],
   [
    "Add products, rejecting duplicate ids and a full inventory.",
    "Search the id array before adding; copy the name with strcpy."
   ],
   [
    "Update stock by id, refusing changes that would make the quantity negative.",
    "Find the index first with a while loop, then check the new quantity."
   ],
   [
    "Print the list, the total value (quantity × price) and the low-stock report.",
    "Use printf widths such as %-12s and %9.2f to line up columns."
   ]
  ],
  "stdin": "A 1 Pen 120 10\nA 2 Notebook 40 45.5\nA 3 Eraser 8 5\nA 2 Marker 10 30\nS 2 -15\nS 3 -20\nL\nV\nW 30\nQ\n",
  "out": "Added Pen\nAdded Notebook\nAdded Eraser\nProduct 2 already exists\nNotebook stock is now 25\nNot enough Eraser in stock (8)\nID   Name           Qty     Price\n1    Pen            120     10.00\n2    Notebook        25     45.50\n3    Eraser           8      5.00\nTotal stock value: 2377.50\nBelow 30: Notebook(25) Eraser(8)\n"
 },
 {
  "n": 6,
  "hours": 3,
  "title": "Menu-driven Product Search Application",
  "plan": "Develop a menu-driven Product Search Application that enables users to retrieve product information based on product ID, name, or price range.",
  "brief": "Load a product list, then answer searches until Q: I id finds one product, N text finds every product whose name contains the text (ignoring case), and P low high lists products in a price range.",
  "extend": "Add sorting of the results by price before printing.",
  "code": "#include <stdio.h>\n#include <ctype.h>\nint main(void)\n{\n    int n, id[100];\n    float price[100];\n    char name[100][20], cmd;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        scanf(\"%d %19s %f\", &id[i], name[i], &price[i]);\n    while (scanf(\" %c\", &cmd) == 1 && cmd != 'Q') {\n        int found = 0;\n        if (cmd == 'I') {\n            int key;\n            scanf(\"%d\", &key);\n            for (int i = 0; i < n; i++)\n                if (id[i] == key) {\n                    printf(\"%d %s %.2f\\n\", id[i], name[i], price[i]);\n                    found = 1;\n                    break;\n                }\n        } else if (cmd == 'N') {\n            char key[20];\n            scanf(\"%19s\", key);\n            for (int i = 0; i < n; i++) {\n                int match = 0;\n                for (int s = 0; name[i][s] != '\\0' && !match; s++) {\n                    int k = 0;\n                    while (key[k] != '\\0' && name[i][s + k] != '\\0' &&\n                           tolower((unsigned char)name[i][s + k]) == tolower((unsigned char)key[k]))\n                        k++;\n                    if (key[k] == '\\0') match = 1;      /* whole key matched */\n                }\n                if (match) { printf(\"%d %s %.2f\\n\", id[i], name[i], price[i]); found++; }\n            }\n        } else if (cmd == 'P') {\n            float lo, hi;\n            scanf(\"%f %f\", &lo, &hi);\n            if (lo > hi) { printf(\"Low price must not exceed high price\\n\"); continue; }\n            for (int i = 0; i < n; i++)\n                if (price[i] >= lo && price[i] <= hi) {\n                    printf(\"%d %s %.2f\\n\", id[i], name[i], price[i]);\n                    found++;\n                }\n        } else {\n            printf(\"Unknown option %c\\n\", cmd);\n            continue;\n        }\n        if (!found) printf(\"Not found\\n\");\n        printf(\"--\\n\");\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l2",
    "3.2 Searching"
   ],
   [
    "u3l5",
    "3.5 Strings"
   ],
   [
    "u2l6",
    "2.6 Loops"
   ]
  ],
  "milestones": [
   [
    "Load n products (id, one-word name, price) into parallel arrays.",
    "The same index across arrays describes one product."
   ],
   [
    "Search by id with linear search and stop at the match.",
    "Print \"Not found\" when the loop finishes without a match."
   ],
   [
    "Search by part of the name, ignoring case, without library search functions.",
    "Try every start position s in the name and compare character by character with tolower until the key ends."
   ],
   [
    "List every product with low <= price <= high, and say so when none match.",
    "Check that low is not greater than high first."
   ]
  ],
  "stdin": "5\n11 Pencil 10\n12 PenDrive 450\n13 Pen 25\n14 Notebook 60\n15 Calculator 799\nI 14\nN pen\nP 20 100\nN box\nP 500 100\nQ\n",
  "out": "14 Notebook 60.00\n--\n11 Pencil 10.00\n12 PenDrive 450.00\n13 Pen 25.00\n--\n13 Pen 25.00\n14 Notebook 60.00\n--\nNot found\n--\nLow price must not exceed high price\n"
 },
 {
  "n": 7,
  "hours": 3,
  "title": "Product Catalog Sorting System",
  "plan": "Design a Product Catalog Sorting System that organizes inventory records using sorting algorithms based on product name, price, and quantity.",
  "brief": "Load products (id, name, price, quantity). Then process sort requests until Q: the first letter picks the field (N name, P price, Q quantity) and the second the order (A ascending, D descending). Print the catalogue after each sort.",
  "extend": "Make the sort stable on ties, such as names A to Z within equal prices.",
  "code": "#include <stdio.h>\n#include <string.h>\nint main(void)\n{\n    int n, id[100], qty[100];\n    float price[100];\n    char name[100][20], field, order;\n    scanf(\"%d\", &n);\n    for (int i = 0; i < n; i++)\n        scanf(\"%d %19s %f %d\", &id[i], name[i], &price[i], &qty[i]);\n    while (scanf(\" %c\", &field) == 1 && field != 'X') {\n        scanf(\" %c\", &order);\n        if ((field != 'N' && field != 'P' && field != 'Q') || (order != 'A' && order != 'D')) {\n            printf(\"Use N, P or Q, then A or D\\n\");\n            continue;\n        }\n        for (int i = 0; i < n - 1; i++)\n            for (int j = 0; j < n - 1 - i; j++) {\n                int cmp;\n                if (field == 'N') cmp = strcmp(name[j], name[j + 1]);\n                else if (field == 'P') cmp = (price[j] > price[j + 1]) - (price[j] < price[j + 1]);\n                else cmp = (qty[j] > qty[j + 1]) - (qty[j] < qty[j + 1]);\n                if ((order == 'A' && cmp > 0) || (order == 'D' && cmp < 0)) {\n                    int ti = id[j]; id[j] = id[j + 1]; id[j + 1] = ti;\n                    int tq = qty[j]; qty[j] = qty[j + 1]; qty[j + 1] = tq;\n                    float tp = price[j]; price[j] = price[j + 1]; price[j + 1] = tp;\n                    char tn[20];\n                    strcpy(tn, name[j]); strcpy(name[j], name[j + 1]); strcpy(name[j + 1], tn);\n                }\n            }\n        printf(\"Sorted by %s, %s:\\n\", field == 'N' ? \"name\" : field == 'P' ? \"price\" : \"quantity\",\n               order == 'A' ? \"ascending\" : \"descending\");\n        for (int i = 0; i < n; i++)\n            printf(\"  %d %-8s %7.2f %4d\\n\", id[i], name[i], price[i], qty[i]);\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l3",
    "3.3 Sorting"
   ],
   [
    "u3l6",
    "3.6 Sorting names"
   ]
  ],
  "milestones": [
   [
    "Load the products into parallel arrays.",
    "Keep id, name, price and quantity at the same index."
   ],
   [
    "Write one bubble sort whose comparison depends on the chosen field and order.",
    "Compute an int \"out of order\" flag: strcmp for names, > or < for numbers."
   ],
   [
    "When two products are swapped, swap every array, including the names with strcpy and a temporary.",
    "Swapping only the field you sort by scrambles the catalogue."
   ],
   [
    "Print the sorted catalogue after each request.",
    "Reuse one printing loop."
   ]
  ],
  "stdin": "4\n11 Pencil 10 300\n12 Stapler 85 40\n13 Eraser 5 500\n14 Marker 30 120\nN A\nP D\nQ A\nX\n",
  "out": "Sorted by name, ascending:\n  13 Eraser      5.00  500\n  14 Marker     30.00  120\n  11 Pencil     10.00  300\n  12 Stapler    85.00   40\nSorted by price, descending:\n  12 Stapler    85.00   40\n  14 Marker     30.00  120\n  11 Pencil     10.00  300\n  13 Eraser      5.00  500\nSorted by quantity, ascending:\n  12 Stapler    85.00   40\n  14 Marker     30.00  120\n  11 Pencil     10.00  300\n  13 Eraser      5.00  500\n"
 },
 {
  "n": 8,
  "hours": 3,
  "title": "Bubble Sort vs Selection Sort Analysis",
  "plan": "Perform a comparative analysis of Bubble Sort and Selection Sort by implementing both algorithms and evaluating their performance on different datasets.",
  "brief": "Generate three kinds of datasets (already sorted, reversed and random) of sizes 10, 50 and 100. Sort a copy of each with bubble sort (with the early-stop check) and with selection sort, counting comparisons and swaps, and print a comparison table.",
  "extend": "Add insertion sort as a third column and compare.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int sizes[3] = {10, 50, 100};\n    char kinds[3][9] = {\"sorted\", \"reversed\", \"random\"};\n    int a[100], b[100];\n    printf(\"%-9s %4s | %8s %6s | %8s %6s\\n\", \"Data\", \"n\", \"Bub cmp\", \"swaps\", \"Sel cmp\", \"swaps\");\n    for (int k = 0; k < 3; k++)\n        for (int s = 0; s < 3; s++) {\n            int n = sizes[s];\n            long seed = 12345;\n            for (int i = 0; i < n; i++) {\n                if (k == 0) a[i] = i;\n                else if (k == 1) a[i] = n - i;\n                else { seed = (seed * 75 + 74) % 65537; a[i] = (int)(seed % 1000); }\n            }\n            long bc = 0, bs = 0, sc = 0, ss = 0;\n            for (int i = 0; i < n; i++) b[i] = a[i];\n            for (int i = 0; i < n - 1; i++) {          /* bubble sort */\n                int swapped = 0;\n                for (int j = 0; j < n - 1 - i; j++) {\n                    bc++;\n                    if (b[j] > b[j + 1]) { int t = b[j]; b[j] = b[j + 1]; b[j + 1] = t; bs++; swapped = 1; }\n                }\n                if (!swapped) break;\n            }\n            for (int i = 0; i < n; i++) b[i] = a[i];\n            for (int i = 0; i < n - 1; i++) {          /* selection sort */\n                int min = i;\n                for (int j = i + 1; j < n; j++) {\n                    sc++;\n                    if (b[j] < b[min]) min = j;\n                }\n                if (min != i) { int t = b[i]; b[i] = b[min]; b[min] = t; ss++; }\n            }\n            printf(\"%-9s %4d | %8ld %6ld | %8ld %6ld\\n\", kinds[k], n, bc, bs, sc, ss);\n        }\n    return 0;\n}",
  "concepts": [
   [
    "u3l3",
    "3.3 Sorting"
   ]
  ],
  "milestones": [
   [
    "Fill an array as sorted, reversed or pseudo-random data of size n.",
    "For repeatable \"random\" numbers use a simple formula such as seed = (seed * 75 + 74) % 65537."
   ],
   [
    "Copy the dataset and run bubble sort with the early-stop check, counting comparisons and swaps.",
    "Reset the counters for every run."
   ],
   [
    "Run selection sort on a fresh copy and count the same things.",
    "Count a swap only when the minimum is not already in place."
   ],
   [
    "Print one row per dataset and size, then write down what you observe.",
    "Look at the sorted rows for bubble sort and at the swap columns."
   ]
  ],
  "stdin": "",
  "out": "Data         n |  Bub cmp  swaps |  Sel cmp  swaps\nsorted      10 |        9      0 |       45      0\nsorted      50 |       49      0 |     1225      0\nsorted     100 |       99      0 |     4950      0\nreversed    10 |       45     45 |       45      5\nreversed    50 |     1225   1225 |     1225     25\nreversed   100 |     4950   4950 |     4950     50\nrandom      10 |       42     26 |       45      8\nrandom      50 |     1180    654 |     1225     46\nrandom     100 |     4740   2451 |     4950     93\n"
 },
 {
  "n": 9,
  "hours": 4,
  "title": "Text Statistics Analyzer",
  "plan": "Develop a Text Statistics Analyzer that processes a paragraph and generates detailed statistics including word count, character count, vowels, consonants, digits, and special characters.",
  "brief": "Read a paragraph (several lines, up to the end of input) into a character array and print the number of characters, letters, vowels, consonants, digits, spaces, special characters, words, lines and sentences.",
  "extend": "Add the most frequent letter and the average word length.",
  "code": "#include <stdio.h>\n#include <ctype.h>\nint main(void)\n{\n    char text[2000];\n    int len = 0, c;\n    while ((c = getchar()) != EOF && len < 1999)\n        text[len++] = (char)c;\n    text[len] = '\\0';\n    int letters = 0, vowels = 0, digits = 0, spaces = 0, special = 0;\n    int words = 0, lines = 0, sentences = 0, inWord = 0;\n    for (int i = 0; text[i] != '\\0'; i++) {\n        unsigned char ch = (unsigned char)text[i];\n        if (isalpha(ch)) {\n            letters++;\n            char l = (char)tolower(ch);\n            if (l == 'a' || l == 'e' || l == 'i' || l == 'o' || l == 'u') vowels++;\n        } else if (isdigit(ch)) digits++;\n        else if (isspace(ch)) spaces++;\n        else special++;\n        if (ch == '\\n') lines++;\n        if (ch == '.' || ch == '!' || ch == '?') sentences++;\n        if (isspace(ch)) inWord = 0;\n        else if (!inWord) { words++; inWord = 1; }\n    }\n    if (len > 0 && text[len - 1] != '\\n') lines++;\n    printf(\"Characters  %d\\n\", len);\n    printf(\"Letters     %d (vowels %d, consonants %d)\\n\", letters, vowels, letters - vowels);\n    printf(\"Digits      %d\\n\", digits);\n    printf(\"Whitespace  %d\\n\", spaces);\n    printf(\"Special     %d\\n\", special);\n    printf(\"Words       %d\\n\", words);\n    printf(\"Lines       %d\\n\", lines);\n    printf(\"Sentences   %d\\n\", sentences);\n    return 0;\n}",
  "concepts": [
   [
    "u3l5",
    "3.5 Strings"
   ],
   [
    "u2l5",
    "2.5 Decisions"
   ]
  ],
  "milestones": [
   [
    "Read the whole paragraph with getchar() until EOF into a char array, adding '\\0' at the end.",
    "Stop one short of the array size so there is always room for the terminator."
   ],
   [
    "Classify each character: letter (then vowel or consonant), digit, whitespace or special.",
    "ctype.h gives isalpha, isdigit and isspace; tolower makes the vowel test shorter."
   ],
   [
    "Count words by noticing where a word starts: a non-space after a space or at the beginning.",
    "A flag inWord avoids counting extra spaces as words."
   ],
   [
    "Count lines (newlines) and sentences (., ! or ?), then print the report.",
    "If the text does not end with a newline, the last line still counts."
   ]
  ],
  "stdin": "C was created at Bell Labs in 1972.\nIt is fast, portable and still popular!\nCan you count 3 sentences here?\n",
  "out": "Characters  108\nLetters     78 (vowels 29, consonants 49)\nDigits      5\nWhitespace  21\nSpecial     4\nWords       21\nLines       3\nSentences   3\n"
 },
 {
  "n": 10,
  "hours": 4,
  "title": "Mini Dictionary Management System",
  "plan": "Create a Mini Dictionary Management System that stores, searches, sorts, and displays vocabulary records using string manipulation techniques in C.",
  "brief": "Store words with their meanings. Commands until Q: A word meaning adds an entry (the meaning is the rest of the line), S word looks a word up ignoring case, O sorts the dictionary alphabetically and L lists it.",
  "extend": "Add a command that deletes a word and one that shows all words starting with a given letter.",
  "code": "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nint main(void)\n{\n    char word[50][20], meaning[50][80], cmd, w[20], line[100];\n    int n = 0;\n    while (scanf(\" %c\", &cmd) == 1 && cmd != 'Q') {\n        if (cmd == 'A' || cmd == 'S') {\n            scanf(\"%19s\", w);\n            for (int i = 0; w[i]; i++) w[i] = (char)tolower((unsigned char)w[i]);\n        }\n        if (cmd == 'A') {\n            if (fgets(line, sizeof line, stdin) == NULL) break;\n            int L = (int)strlen(line);\n            if (L > 0 && line[L - 1] == '\\n') line[L - 1] = '\\0';   /* drop the newline */\n            int s = 0;\n            while (line[s] == ' ') s++;                 /* skip leading spaces */\n            int dup = 0;\n            for (int i = 0; i < n; i++)\n                if (strcmp(word[i], w) == 0) dup = 1;\n            if (dup) printf(\"%s is already in the dictionary\\n\", w);\n            else if (n == 50) printf(\"Dictionary is full\\n\");\n            else {\n                strcpy(word[n], w);\n                strncpy(meaning[n], line + s, 79);\n                meaning[n][79] = '\\0';\n                n++;\n                printf(\"Added %s\\n\", w);\n            }\n        } else if (cmd == 'S') {\n            int i = 0;\n            while (i < n && strcmp(word[i], w) != 0) i++;\n            if (i < n) printf(\"%s: %s\\n\", word[i], meaning[i]);\n            else printf(\"%s not found\\n\", w);\n        } else if (cmd == 'O') {\n            for (int i = 0; i < n - 1; i++)\n                for (int j = 0; j < n - 1 - i; j++)\n                    if (strcmp(word[j], word[j + 1]) > 0) {\n                        char t[80];\n                        strcpy(t, word[j]); strcpy(word[j], word[j + 1]); strcpy(word[j + 1], t);\n                        strcpy(t, meaning[j]); strcpy(meaning[j], meaning[j + 1]); strcpy(meaning[j + 1], t);\n                    }\n            printf(\"Sorted %d words\\n\", n);\n        } else if (cmd == 'L') {\n            for (int i = 0; i < n; i++) printf(\"%-10s %s\\n\", word[i], meaning[i]);\n        } else {\n            printf(\"Unknown command %c\\n\", cmd);\n        }\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l5",
    "3.5 Strings"
   ],
   [
    "u3l6",
    "3.6 String functions and sorting names"
   ]
  ],
  "milestones": [
   [
    "Use char word[50][20] and char meaning[50][80] as parallel 2-D arrays.",
    "Row i of both arrays forms one entry."
   ],
   [
    "Read the meaning as the rest of the line with fgets, then remove the newline and leading spaces.",
    "After scanf reads the word, fgets picks up what is left on that line."
   ],
   [
    "Store words in lowercase so searching can use strcmp and ignore case.",
    "Convert the word and the search key with tolower in a loop."
   ],
   [
    "Sort alphabetically with bubble sort and strcmp, swapping both words and meanings.",
    "Swap strings with strcpy through a temporary array."
   ]
  ],
  "stdin": "A Pointer a variable that stores an address\nA array a fixed-size list of same-type values\nA Loop repeats a block of code\nA array duplicate\nS ARRAY\nS stack\nO\nL\nQ\n",
  "out": "Added pointer\nAdded array\nAdded loop\narray is already in the dictionary\narray: a fixed-size list of same-type values\nstack not found\nSorted 3 words\narray      a fixed-size list of same-type values\nloop       repeats a block of code\npointer    a variable that stores an address\n"
 },
 {
  "n": 11,
  "hours": 4,
  "title": "Keyword Search Tool",
  "plan": "Implement a Keyword Search Tool that identifies and counts the occurrence of specific words or phrases within a given document.",
  "brief": "Read a document line by line until a line containing only END. Then read search terms (one per line, words or phrases) until the end of input. For each term, count whole-word matches ignoring case and list the line numbers where it appears.",
  "extend": "Make the search case-sensitive on request, or highlight each match in the printed line.",
  "code": "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nint main(void)\n{\n    char doc[50][120], term[60];\n    int lines = 0;\n    while (lines < 50 && fgets(doc[lines], sizeof doc[lines], stdin) != NULL) {\n        int L = (int)strlen(doc[lines]);\n        if (L > 0 && doc[lines][L - 1] == '\\n') doc[lines][L - 1] = '\\0';\n        if (strcmp(doc[lines], \"END\") == 0) break;\n        lines++;\n    }\n    while (fgets(term, sizeof term, stdin) != NULL) {\n        int L = (int)strlen(term);\n        if (L > 0 && term[L - 1] == '\\n') term[--L] = '\\0';\n        int tlen = (int)strlen(term), total = 0;\n        if (tlen == 0) continue;\n        printf(\"\\\"%s\\\":\", term);\n        for (int L = 0; L < lines; L++) {\n            int onLine = 0, len = (int)strlen(doc[L]);\n            for (int s = 0; s + tlen <= len; s++) {\n                int k = 0;\n                while (k < tlen && tolower((unsigned char)doc[L][s + k]) == tolower((unsigned char)term[k])) k++;\n                if (k < tlen) continue;\n                int before = (s == 0) || !isalpha((unsigned char)doc[L][s - 1]);\n                int after = !isalpha((unsigned char)doc[L][s + tlen]);\n                if (before && after) { total++; onLine = 1; }\n            }\n            if (onLine) printf(\" line %d\", L + 1);\n        }\n        if (total) printf(\" (%d time%s)\\n\", total, total > 1 ? \"s\" : \"\");\n        else printf(\" not found\\n\");\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l5",
    "3.5 Strings"
   ],
   [
    "u3l4",
    "3.4 Two-dimensional arrays"
   ]
  ],
  "milestones": [
   [
    "Store the document in char doc[50][120] using fgets, stopping at the END line.",
    "Remove the newline from each line so END compares equal."
   ],
   [
    "For each term, try every starting position in every line and compare character by character, ignoring case.",
    "tolower on both sides makes \"C\" match \"c\"."
   ],
   [
    "Count a match only if it is a whole word: the characters just before and after are not letters.",
    "Check the start of the line and the end of the match separately."
   ],
   [
    "Print the count and the line numbers for each term, or say it was not found.",
    "Print each line number once even if the term appears twice on it."
   ]
  ],
  "stdin": "C is a general purpose language.\nPointers in C give direct memory access.\nMany languages copied C syntax.\nThe C language is fast.\nEND\nc\nlanguage\nC language\nJava\n",
  "out": "\"c\": line 1 line 2 line 3 line 4 (4 times)\n\"language\": line 1 line 4 (2 times)\n\"C language\": line 4 (1 time)\n\"Java\": not found\n"
 },
 {
  "n": 12,
  "hours": 4,
  "title": "Library Book Management System",
  "plan": "Design a Library Book Management System capable of storing, searching, sorting, and managing book records using arrays and string operations.",
  "brief": "Manage books with an id, a title (may contain spaces), an author and an available flag. Commands until Q: A id then the title and author on the next two lines, I id issues a book, R id returns it, S word searches titles ignoring case, O sorts by title and L lists all books.",
  "extend": "Record the borrower’s roll number when a book is issued.",
  "code": "#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nint main(void)\n{\n    int id[50], avail[50], n = 0;\n    char title[50][60], author[50][40], cmd;\n    while (scanf(\" %c\", &cmd) == 1 && cmd != 'Q') {\n        if (cmd == 'A') {\n            int newId;\n            scanf(\"%d\", &newId);\n            getchar();                                  /* newline after the id */\n            if (n == 50) { printf(\"Library is full\\n\"); continue; }\n            if (fgets(title[n], sizeof title[n], stdin) == NULL) break;\n            if (fgets(author[n], sizeof author[n], stdin) == NULL) break;\n            for (int k = 0; title[n][k]; k++) if (title[n][k] == '\\n') title[n][k] = '\\0';\n            for (int k = 0; author[n][k]; k++) if (author[n][k] == '\\n') author[n][k] = '\\0';\n            id[n] = newId;\n            avail[n] = 1;\n            printf(\"Added %d: %s\\n\", id[n], title[n]);\n            n++;\n        } else if (cmd == 'I' || cmd == 'R') {\n            int key, i = 0;\n            scanf(\"%d\", &key);\n            while (i < n && id[i] != key) i++;\n            if (i == n) printf(\"No book %d\\n\", key);\n            else if (cmd == 'I' && !avail[i]) printf(\"%s is already issued\\n\", title[i]);\n            else if (cmd == 'R' && avail[i]) printf(\"%s was not issued\\n\", title[i]);\n            else {\n                avail[i] = (cmd == 'R');\n                printf(\"%s %s\\n\", cmd == 'I' ? \"Issued\" : \"Returned\", title[i]);\n            }\n        } else if (cmd == 'S') {\n            char key[30];\n            int found = 0;\n            scanf(\"%29s\", key);\n            int klen = (int)strlen(key);\n            for (int i = 0; i < n; i++) {\n                int len = (int)strlen(title[i]), hit = 0;\n                for (int s = 0; s + klen <= len && !hit; s++) {\n                    int k = 0;\n                    while (k < klen && tolower((unsigned char)title[i][s + k]) == tolower((unsigned char)key[k])) k++;\n                    if (k == klen) hit = 1;\n                }\n                if (hit) { printf(\"  %d %s\\n\", id[i], title[i]); found++; }\n            }\n            printf(\"%d book%s found for \\\"%s\\\"\\n\", found, found == 1 ? \"\" : \"s\", key);\n        } else if (cmd == 'O') {\n            for (int i = 0; i < n - 1; i++)\n                for (int j = 0; j < n - 1 - i; j++)\n                    if (strcmp(title[j], title[j + 1]) > 0) {\n                        char t[60];\n                        int ti;\n                        strcpy(t, title[j]); strcpy(title[j], title[j + 1]); strcpy(title[j + 1], t);\n                        strcpy(t, author[j]); strcpy(author[j], author[j + 1]); strcpy(author[j + 1], t);\n                        ti = id[j]; id[j] = id[j + 1]; id[j + 1] = ti;\n                        ti = avail[j]; avail[j] = avail[j + 1]; avail[j + 1] = ti;\n                    }\n            printf(\"Sorted by title\\n\");\n        } else if (cmd == 'L') {\n            for (int i = 0; i < n; i++)\n                printf(\"%d  %-28s %-22s %s\\n\", id[i], title[i], author[i], avail[i] ? \"available\" : \"issued\");\n        } else {\n            printf(\"Unknown command %c\\n\", cmd);\n        }\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l6",
    "3.6 String functions and sorting names"
   ],
   [
    "u3l2",
    "3.2 Searching"
   ]
  ],
  "milestones": [
   [
    "Store id, title, author and available in parallel arrays; read titles and authors with fgets so spaces are allowed.",
    "After scanf(\"%d\", ...), call getchar() once to consume the newline before fgets."
   ],
   [
    "Issue and return books by id, refusing to issue a book that is already out or return one that is in.",
    "Find the index with linear search first."
   ],
   [
    "Search titles for a word ignoring case.",
    "Compare character by character with tolower at every starting position."
   ],
   [
    "Sort by title with strcmp, moving every field together, and list the books.",
    "Swap the int arrays with a temporary int and the strings with strcpy."
   ]
  ],
  "stdin": "A 101\nLet Us C\nYashavant Kanetkar\nA 102\nThe C Programming Language\nKernighan and Ritchie\nA 103\nProgramming in ANSI C\nE Balagurusamy\nI 102\nI 102\nR 101\nS c\nS ansi\nO\nL\nQ\n",
  "out": "Added 101: Let Us C\nAdded 102: The C Programming Language\nAdded 103: Programming in ANSI C\nIssued The C Programming Language\nThe C Programming Language is already issued\nLet Us C was not issued\n  101 Let Us C\n  102 The C Programming Language\n  103 Programming in ANSI C\n3 books found for \"c\"\n  103 Programming in ANSI C\n1 book found for \"ansi\"\nSorted by title\n101  Let Us C                     Yashavant Kanetkar     available\n103  Programming in ANSI C        E Balagurusamy         available\n102  The C Programming Language   Kernighan and Ritchie  issued\n"
 },
 {
  "n": 13,
  "hours": 4,
  "title": "Matrix Calculator",
  "plan": "Develop a Matrix Calculator that performs matrix addition, subtraction, multiplication, and transpose operations using two-dimensional arrays.",
  "brief": "Read matrices A and B with their sizes, then perform operations until 0: 1 adds, 2 subtracts, 3 multiplies, 4 transposes A and 5 transposes B. Check sizes before each operation and print a clear message when it is not possible.",
  "extend": "Add a determinant for 2 × 2 and 3 × 3 matrices, or check whether A is symmetric.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int a[10][10], b[10][10], r[10][10], ra, ca, rb, cb, op, rr = 0, rc = 0;\n    scanf(\"%d %d\", &ra, &ca);\n    if (ra < 1 || ra > 10 || ca < 1 || ca > 10) { printf(\"Sizes must be 1 to 10\\n\"); return 0; }\n    for (int i = 0; i < ra; i++) for (int j = 0; j < ca; j++) scanf(\"%d\", &a[i][j]);\n    scanf(\"%d %d\", &rb, &cb);\n    if (rb < 1 || rb > 10 || cb < 1 || cb > 10) { printf(\"Sizes must be 1 to 10\\n\"); return 0; }\n    for (int i = 0; i < rb; i++) for (int j = 0; j < cb; j++) scanf(\"%d\", &b[i][j]);\n    while (scanf(\"%d\", &op) == 1 && op != 0) {\n        int ok = 1;\n        if (op == 1 || op == 2) {\n            if (ra != rb || ca != cb) { printf(\"Add/subtract needs equal sizes\\n\"); ok = 0; }\n            else {\n                rr = ra; rc = ca;\n                for (int i = 0; i < ra; i++)\n                    for (int j = 0; j < ca; j++)\n                        r[i][j] = (op == 1) ? a[i][j] + b[i][j] : a[i][j] - b[i][j];\n            }\n        } else if (op == 3) {\n            if (ca != rb) { printf(\"Multiply needs columns of A = rows of B\\n\"); ok = 0; }\n            else {\n                rr = ra; rc = cb;\n                for (int i = 0; i < ra; i++)\n                    for (int j = 0; j < cb; j++) {\n                        r[i][j] = 0;\n                        for (int k = 0; k < ca; k++) r[i][j] += a[i][k] * b[k][j];\n                    }\n            }\n        } else if (op == 4) {\n            rr = ca; rc = ra;\n            for (int i = 0; i < ra; i++)\n                for (int j = 0; j < ca; j++) r[j][i] = a[i][j];\n        } else if (op == 5) {\n            rr = cb; rc = rb;\n            for (int i = 0; i < rb; i++)\n                for (int j = 0; j < cb; j++) r[j][i] = b[i][j];\n        } else { printf(\"Choose 1 to 5, or 0 to stop\\n\"); ok = 0; }\n        if (ok) {\n            char names[6][14] = {\"\", \"A + B\", \"A - B\", \"A x B\", \"Transpose A\", \"Transpose B\"};\n            printf(\"%s (%d x %d):\\n\", names[op], rr, rc);\n            for (int i = 0; i < rr; i++) {\n                for (int j = 0; j < rc; j++) printf(\"%5d\", r[i][j]);\n                printf(\"\\n\");\n            }\n        }\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l4",
    "3.4 Two-dimensional arrays and matrices"
   ]
  ],
  "milestones": [
   [
    "Read the size and elements of A and B into int arrays of at most 10 × 10.",
    "Reject sizes outside 1 to 10."
   ],
   [
    "Add and subtract only when both matrices have the same size.",
    "One pair of nested loops; the operator changes."
   ],
   [
    "Multiply only when the columns of A equal the rows of B.",
    "Three nested loops; reset the cell to 0 before the k loop."
   ],
   [
    "Transpose into a result matrix and print every result with aligned columns.",
    "result[j][i] = a[i][j], and the result size is columns × rows."
   ]
  ],
  "stdin": "2 3\n1 2 3\n4 5 6\n3 2\n7 8\n9 10\n11 12\n1\n3\n4\n5\n0\n",
  "out": "Add/subtract needs equal sizes\nA x B (2 x 2):\n   58   64\n  139  154\nTranspose A (3 x 2):\n    1    4\n    2    5\n    3    6\nTranspose B (2 x 3):\n    7    9   11\n    8   10   12\n"
 },
 {
  "n": 14,
  "hours": 4,
  "title": "Utility Consumption Monitoring System",
  "plan": "Create a Utility Consumption Monitoring System that analyzes monthly electricity or water usage data and generates consumption reports using multidimensional arrays.",
  "brief": "Read the monthly electricity units of h households for 12 months into a 2-D array. Report each household’s total, monthly average, peak month and an estimated annual bill, then the busiest month for the whole colony and the households using more than the colony average.",
  "extend": "Flag any month that jumps more than 30% over the previous month as a possible leak or fault.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int h, use[20][12], total[20];\n    char month[12][4] = {\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\", \"Jun\", \"Jul\", \"Aug\", \"Sep\", \"Oct\", \"Nov\", \"Dec\"};\n    scanf(\"%d\", &h);\n    if (h < 1 || h > 20) { printf(\"Households must be 1 to 20\\n\"); return 0; }\n    for (int i = 0; i < h; i++)\n        for (int m = 0; m < 12; m++)\n            scanf(\"%d\", &use[i][m]);\n    long colony = 0;\n    printf(\"House  Total  Avg/month  Peak   Bill\\n\");\n    for (int i = 0; i < h; i++) {\n        int peak = 0;\n        float bill = 0;\n        total[i] = 0;\n        for (int m = 0; m < 12; m++) {\n            int u = use[i][m];\n            total[i] += u;\n            if (u > use[i][peak]) peak = m;\n            if (u <= 100) bill += u * 3;\n            else if (u <= 200) bill += 100 * 3 + (u - 100) * 5;\n            else bill += 100 * 3 + 100 * 5 + (u - 200) * 7;\n        }\n        colony += total[i];\n        printf(\"%5d %6d %10.1f  %s %7.0f\\n\", i + 1, total[i], total[i] / 12.0, month[peak], bill);\n    }\n    int busiest = 0, colMax = 0;\n    for (int m = 0; m < 12; m++) {\n        int sum = 0;\n        for (int i = 0; i < h; i++) sum += use[i][m];\n        if (sum > colMax) { colMax = sum; busiest = m; }\n    }\n    float avg = (float)colony / h;\n    printf(\"Busiest month for the colony: %s (%d units)\\n\", month[busiest], colMax);\n    printf(\"Colony average per household: %.1f units. Above average:\", avg);\n    for (int i = 0; i < h; i++)\n        if (total[i] > avg) printf(\" house %d\", i + 1);\n    printf(\"\\n\");\n    return 0;\n}",
  "concepts": [
   [
    "u3l4",
    "3.4 Two-dimensional arrays"
   ],
   [
    "u2l5",
    "2.5 Decisions"
   ]
  ],
  "milestones": [
   [
    "Store units in int use[20][12] (rows are households, columns are months) and month names in char month[12][4].",
    "Read row by row: household i, then its 12 values."
   ],
   [
    "For each household, find the total, average and peak month.",
    "Track the index of the largest value, then print month[index]."
   ],
   [
    "Estimate each month’s bill with a slab tariff: the first 100 units at 3, the next 100 at 5 and the rest at 7 (example rates).",
    "Use an else-if ladder on the units for one month, then add up the year."
   ],
   [
    "Add each column to get colony totals per month, and list households above the colony’s average yearly use.",
    "Column sums need the loops the other way round: month outer, household inner."
   ]
  ],
  "stdin": "3\n120 110 95 130 180 240 260 250 190 140 115 125\n80 75 70 85 90 120 130 125 100 90 85 80\n210 200 190 220 300 380 400 390 320 250 220 215\n",
  "out": "House  Total  Avg/month  Peak   Bill\n    1   1955      162.9  Jul    7685\n    2   1130       94.2  Jul    3540\n    3   3295      274.6  Jul   15885\nBusiest month for the colony: Jul (790 units)\nColony average per household: 2126.7 units. Above average: house 3\n"
 },
 {
  "n": 15,
  "hours": 4,
  "title": "Examination Seating Management System",
  "plan": "Design an Examination Seating Management System that allocates, searches, and displays seat arrangements using matrix-based representations.",
  "brief": "A hall has R rows and C columns. Seat students from two branches in a checkerboard pattern so no two students of the same branch sit side by side or one behind the other. Display the seating chart, then find the seat of each roll number queried.",
  "extend": "Add a third branch and arrange seats so that neighbours on all four sides differ.",
  "code": "#include <stdio.h>\nint main(void)\n{\n    int R, C, seat[10][10], startA, countA, startB, countB, key;\n    scanf(\"%d %d %d %d %d %d\", &R, &C, &startA, &countA, &startB, &countB);\n    if (R < 1 || R > 10 || C < 1 || C > 10) { printf(\"Hall size must be 1 to 10\\n\"); return 0; }\n    int nextA = startA, nextB = startB, leftA = countA, leftB = countB;\n    for (int r = 0; r < R; r++)\n        for (int c = 0; c < C; c++) {\n            seat[r][c] = 0;\n            if ((r + c) % 2 == 0 && leftA > 0) { seat[r][c] = nextA++; leftA--; }\n            else if ((r + c) % 2 == 1 && leftB > 0) { seat[r][c] = nextB++; leftB--; }\n        }\n    printf(\"    \");\n    for (int c = 0; c < C; c++) printf(\"%5d\", c + 1);\n    printf(\"\\n\");\n    for (int r = 0; r < R; r++) {\n        printf(\"  %c \", 'A' + r);\n        for (int c = 0; c < C; c++)\n            if (seat[r][c]) printf(\"%5d\", seat[r][c]);\n            else printf(\"    -\");\n        printf(\"\\n\");\n    }\n    if (leftA || leftB) printf(\"Not seated: %d from branch A, %d from branch B\\n\", leftA, leftB);\n    while (scanf(\"%d\", &key) == 1) {\n        int found = 0;\n        for (int r = 0; r < R && !found; r++)\n            for (int c = 0; c < C && !found; c++)\n                if (seat[r][c] == key) { printf(\"Roll %d: seat %c%d\\n\", key, 'A' + r, c + 1); found = 1; }\n        if (!found) printf(\"Roll %d: no seat allotted\\n\", key);\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l4",
    "3.4 Two-dimensional arrays"
   ],
   [
    "u3l2",
    "3.2 Searching"
   ]
  ],
  "milestones": [
   [
    "Read the hall size and, for each branch, the first roll number and the student count.",
    "Rolls are consecutive, so a first roll and a count describe the whole branch."
   ],
   [
    "Fill seat[r][c]: branch A where (r + c) is even, branch B where it is odd, 0 for an empty seat.",
    "Keep the next roll number for each branch and stop when its count runs out."
   ],
   [
    "Print the chart with row letters and column numbers, and warn about students who did not get a seat.",
    "Row letter is 'A' + r."
   ],
   [
    "Search the matrix for each queried roll number and print its seat, such as B3.",
    "Nested loops with a found flag to stop both loops."
   ]
  ],
  "stdin": "4 5\n101 10\n201 9\n105 207 120 210\n",
  "out": "        1    2    3    4    5\n  A   101  201  102  202  103\n  B   203  104  204  105  205\n  C   106  206  107  207  108\n  D   208  109  209  110    -\nRoll 105: seat B4\nRoll 207: seat C4\nRoll 120: no seat allotted\nRoll 210: no seat allotted\n"
 },
 {
  "n": 16,
  "hours": 4,
  "title": "Integrated Student Information System",
  "plan": "Develop an Integrated Student Information System that combines record management, grade analysis, searching, sorting, and reporting functionalities into a comprehensive C programming application.",
  "brief": "Bring projects 1 to 4 together. Load student records (roll, name, three subject marks) and process commands until Q: L lists everyone with total, percentage and grade; R roll finds a student with binary search; N name finds by name; T prints a rank list by total; S prints class statistics.",
  "extend": "Save the records to a file and load them next time (Unit 5, files).",
  "code": "#include <stdio.h>\n#include <string.h>\n\nint roll[100], m[100][3], total[100], n;\nchar name[100][20], grade[100][3];\n\nvoid computeGrade(int i)\n{\n    int fail = m[i][0] < 40 || m[i][1] < 40 || m[i][2] < 40;\n    float pct = total[i] / 3.0f;\n    if (fail) strcpy(grade[i], \"F\");\n    else if (pct >= 90) strcpy(grade[i], \"A+\");\n    else if (pct >= 80) strcpy(grade[i], \"A\");\n    else if (pct >= 70) strcpy(grade[i], \"B\");\n    else if (pct >= 60) strcpy(grade[i], \"C\");\n    else if (pct >= 50) strcpy(grade[i], \"D\");\n    else strcpy(grade[i], \"E\");\n}\n\nvoid swapRecords(int a, int b)\n{\n    int t = roll[a]; roll[a] = roll[b]; roll[b] = t;\n    t = total[a]; total[a] = total[b]; total[b] = t;\n    for (int k = 0; k < 3; k++) { t = m[a][k]; m[a][k] = m[b][k]; m[b][k] = t; }\n    char s[20];\n    strcpy(s, name[a]); strcpy(name[a], name[b]); strcpy(name[b], s);\n    strcpy(s, grade[a]); strcpy(grade[a], grade[b]); strcpy(grade[b], s);\n}\n\nvoid printOne(int i)\n{\n    printf(\"%d %-8s %3d %3d %3d  total %3d  %6.2f%%  %s\\n\", roll[i], name[i],\n           m[i][0], m[i][1], m[i][2], total[i], total[i] / 3.0f, grade[i]);\n}\n\nint findRoll(int key)                     /* binary search on roll numbers */\n{\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (roll[mid] == key) return mid;\n        if (key < roll[mid]) high = mid - 1;\n        else low = mid + 1;\n    }\n    return -1;\n}\n\nvoid rankList(void)\n{\n    int idx[100];\n    for (int i = 0; i < n; i++) idx[i] = i;\n    for (int i = 0; i < n - 1; i++)\n        for (int j = 0; j < n - 1 - i; j++)\n            if (total[idx[j]] < total[idx[j + 1]]) { int t = idx[j]; idx[j] = idx[j + 1]; idx[j + 1] = t; }\n    for (int r = 0; r < n; r++) {\n        printf(\"%d. \", r + 1);\n        printOne(idx[r]);\n    }\n}\n\nvoid statistics(void)\n{\n    int sum = 0, top = 0, pass = 0;\n    for (int i = 0; i < n; i++) {\n        sum += total[i];\n        if (total[i] > total[top]) top = i;\n        if (strcmp(grade[i], \"F\") != 0) pass++;\n    }\n    printf(\"Class average total %.2f, topper %s (%d)\\n\", (float)sum / n, name[top], total[top]);\n    printf(\"Pass percentage %.1f%% (%d of %d)\\n\", 100.0 * pass / n, pass, n);\n}\n\nint main(void)\n{\n    char cmd;\n    scanf(\"%d\", &n);\n    if (n < 1 || n > 100) { printf(\"n must be 1 to 100\\n\"); return 0; }\n    for (int i = 0; i < n; i++) {\n        scanf(\"%d %19s %d %d %d\", &roll[i], name[i], &m[i][0], &m[i][1], &m[i][2]);\n        total[i] = m[i][0] + m[i][1] + m[i][2];\n        computeGrade(i);\n    }\n    for (int i = 0; i < n - 1; i++)       /* keep records sorted by roll */\n        for (int j = 0; j < n - 1 - i; j++)\n            if (roll[j] > roll[j + 1]) swapRecords(j, j + 1);\n    while (scanf(\" %c\", &cmd) == 1 && cmd != 'Q') {\n        if (cmd == 'L') for (int i = 0; i < n; i++) printOne(i);\n        else if (cmd == 'R') {\n            int key, pos;\n            scanf(\"%d\", &key);\n            pos = findRoll(key);\n            if (pos >= 0) printOne(pos);\n            else printf(\"Roll %d not found\\n\", key);\n        } else if (cmd == 'N') {\n            char key[20];\n            int found = 0;\n            scanf(\"%19s\", key);\n            for (int i = 0; i < n; i++)\n                if (strcmp(name[i], key) == 0) { printOne(i); found = 1; }\n            if (!found) printf(\"%s not found\\n\", key);\n        } else if (cmd == 'T') rankList();\n        else if (cmd == 'S') statistics();\n        else printf(\"Unknown command %c\\n\", cmd);\n    }\n    return 0;\n}",
  "concepts": [
   [
    "u3l2",
    "3.2 Searching"
   ],
   [
    "u3l3",
    "3.3 Sorting"
   ],
   [
    "u3l6",
    "3.6 Strings"
   ],
   [
    "u4l1",
    "4.1 Functions"
   ]
  ],
  "milestones": [
   [
    "Load the records and compute each student’s total and grade once, storing them in arrays.",
    "Reuse the grade ladder from project 2."
   ],
   [
    "Keep the records sorted by roll number so R can use binary search.",
    "Sort once after loading, moving every field together."
   ],
   [
    "Print a rank list by total without disturbing the roll order: sort an array of indices instead of the records.",
    "Fill idx[i] = i, then sort idx by total[idx[i]]."
   ],
   [
    "Report class statistics: average, topper, pass percentage and grade counts. Splitting the work into functions (Unit 4) keeps main short.",
    "Write one function per command, passing the arrays and n."
   ]
  ],
  "stdin": "5\n104 Kiran 78 85 80\n101 Asha 92 88 95\n105 Ravi 45 38 70\n103 Meena 66 72 70\n102 Divya 81 79 90\nL\nR 103\nR 110\nN Divya\nT\nS\nQ\n",
  "out": "101 Asha      92  88  95  total 275   91.67%  A+\n102 Divya     81  79  90  total 250   83.33%  A\n103 Meena     66  72  70  total 208   69.33%  C\n104 Kiran     78  85  80  total 243   81.00%  A\n105 Ravi      45  38  70  total 153   51.00%  F\n103 Meena     66  72  70  total 208   69.33%  C\nRoll 110 not found\n102 Divya     81  79  90  total 250   83.33%  A\n1. 101 Asha      92  88  95  total 275   91.67%  A+\n2. 102 Divya     81  79  90  total 250   83.33%  A\n3. 104 Kiran     78  85  80  total 243   81.00%  A\n4. 103 Meena     66  72  70  total 208   69.33%  C\n5. 105 Ravi      45  38  70  total 153   51.00%  F\nClass average total 225.80, topper Asha (275)\nPass percentage 80.0% (4 of 5)\n"
 }
];
