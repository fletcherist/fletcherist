---
title: ML/deeplearning
created: '2019-03-05T19:24:17.665Z'
modified: '2019-03-17T16:25:56.375Z'
---

# ML/deeplearning

## Activation functions
f(x) that converts values to specific range

popular ones:
1. **identity** f(x) = x
```typescript
f(x) => x
```
2. **binary step** 
converts all negative ones to zero
converts all positive inputs to one
```typescript
f(x) => {
  if x < 0: return 0
  if x >= 0: return 1
}
```
3. **Sigmoid (Logistic)**
whatever your input is, it maps it between 0 and 1
```typescript
f(x) => {
   return 1 / (1 + Math.pow(e, -x))
}
```
4. **TanH**
whatever your input is, it converts into number in range [-1,1]
```typescript
f(x)=> {
  return 2 / (1 + Math.pow(e, -2x)) - 1
}
```
5. **ReLU**
popular in deep learning
```typescript
f(x) => {
  if x >= 0: return x
  if x < 0: return 0
}
```
**SoftMax**
popular in neural networks to calculate probabilities at classification tasks.
gives you a probability distribution of input vectors. the larger input vector — the higher probability in distribution
