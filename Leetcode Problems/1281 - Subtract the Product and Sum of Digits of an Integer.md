
## Problem

Given an integer number `n`, return the difference between the product of its digits and the sum of its digits.

**Example 1:**

**Input:** n = 234
**Output:** 15 
**Explanation:** 
Product of digits = 2 * 3 * 4 = 24 
Sum of digits = 2 + 3 + 4 = 9 
Result = 24 - 9 = 15

**Example 2:**

**Input:** n = 4421
**Output:** 21
**Explanation:** 
Product of digits = 4 * 4 * 2 * 1 = 32 
Sum of digits = 4 + 4 + 2 + 1 = 11 
Result = 32 - 11 = 21

**Constraints:**

-   `1 <= n <= 10^5`


## Solution

```cpp
int subtractProductAndSum(int n) {
        int sum = 0;
        int pro = 1;
        int num = n;
        while (true) {
            int r = num % 10;
            sum += r;
            pro *= r;
            int d = num / 10;
            if (d == 0) {
                break;
            }
            num = d;

        }
        return pro - sum;
    }
```

