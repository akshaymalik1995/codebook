## Generic

**Color**

```
color = transparent|inherit|current|black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose

shade = 50|100|200|300|400|500|600|700|800|900

opacity = {color}-{shade}/{number} || {color}-{shade}/[0.5]
```

## Border

**Radius**

```
size = none|sm|md|lg|xl|2xl|3xl|full
side = x|y|s|e|t|r|l|b
rounded-{size}
rouned-{side|ss|se|tl|tr|br|bl}-{size}
```

**Width**

```
width = 0|2|4|8
border-{width}
border-{side}-{width}

```

**Color**

```
border-{color}-{shade}
border-{side}-{color}
```

**Style**

```
style = solid|dashed|dotted|double|hidden|none
border-{style}
```

**Divide**

```
divide-{x|y}-{width|color|style}
```

**Ring**

```
ring-{0|1|2|4|8|inset}
ring-{color}-{shade}
ring-offset-{0|1|2|4|8}
```

**Outline**

```
outline-{0|1|2|4|8|inset}
outline-{style}
outline-offset-{0|1|2|4|8}
```

## Backgrounds

**Repeat**

```
bg-repeat
bg-no-repeat
bg-repeat-{x|y|round|space}
```

**Size**

```
bg-{auto|cover|contain}
```

**Gradient**

```
bg-gradient-to-{r|l|t|b|tr|tl|br|bl}
{from|via|to}-{color}-{shade}
{from|via|to}-{percent}
```

