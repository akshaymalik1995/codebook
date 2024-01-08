
## Measuring Accuracy

Now we can make predictions using a classifier, but how do we know if the model is making correct predictions? We can evaluate its performance!

In classification, accuracy is a commonly-used metric. Accuracy is the number of correct predictions divided by the total number of observations.

How do we measure accuracy?

It is common to split data into a training set and a test set. We fit the classifier using the training set, then we calculate the model's accuracy against the test set's labels.

To do this, we import `train_test_split` from `sklearn.model_selection`. We call `train_test_split`, passing our features and targets. We commonly use 20-30% of our data as the test set. By setting the `test_size` argument to zero-point-three we use 30% here. The `random_state` argument sets a seed for a random number generator that splits the data. Using the same number when repeating this step allows us to reproduce the exact split and our downstream results. 

It is best practice to ensure our split reflects the proportion of labels in our data. So if churn occurs in 10% of observations, we want 10% of labels in our training and test sets to represent churn. We achieve this by setting `stratify` equal to `y`.

`train_test_split` returns four arrays: the **training data**, the **test data**, the **training labels**, and the **test labels**. We unpack these into `X_train`, `X_test`, `y_train`, and `y_test,` respectively. We then instantiate a KNN model and fit it to the training data using the `fit()` method. To check the accuracy, we use the `score()` method, passing `X_test` and `y_test`. 

```python
from sklearn.model_selection import train_test_split

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.3,
                                                    random_state=21, stratify=y)

# Define a KNN classifier
knn = KNeighborsClassifier(n_neighbors=6)

# Train the classifier on the training set
knn.fit(X_train, y_train)

# Evaluate the classifier on the test set
print(knn.score(X_test, y_test))


```


## Model Complexity

Let's discuss how to interpret k. Recall that we discussed decision boundaries, which are thresholds for determining what label a model assigns to an observation. In the image shown, as k increases, the decision boundary is less affected by individual observations, reflecting a simpler model. 

Simpler models are less able to detect relationships in the dataset, which is known as underfitting. 

In contrast, complex models can be sensitive to noise in the training data, rather than reflecting general trends. This is known as overfitting.

![](https://i.imgur.com/7j8ApvE.png)


## Model complexity curve

We can also interpret k using a model complexity curve. With a KNN model, we can calculate accuracy on the training and test sets using incremental k values, and plot the results. We create empty dictionaries to store our train and test accuracies, and an array containing a range of k values. We use a for loop to repeat our previous workflow, building several models using a different number of neighbors. We loop through our neighbors array and, inside the loop, we instantiate a KNN model with n_neighbors equal to the neighbor iterator, and fit to the training data. We then calculate training and test set accuracy, storing the results in their respective dictionaries.

```python
train_accuracies = {}
test_accuracies = {}

# Try different values of k
neighbors = np.arange(1, 26)
for neighbor in neighbors:
    # Create a KNN classifier with the specified number of neighbors
    knn = KNeighborsClassifier(n_neighbors=neighbor)
    # Train the classifier on the training set
    knn.fit(X_train, y_train)
    # Evaluate the classifier on the training set
    train_accuracies[neighbor] = knn.score(X_train, y_train)
    # Evaluate the classifier on the test set
    test_accuracies[neighbor] = knn.score(X_test, y_test)

```


**Plotting** our Results

```python
import matplotlib.pyplot as plt

# Create a figure
plt.figure(figsize=(8, 6))

# Plot the training and test accuracies
plt.plot(neighbors, train_accuracies.values(), label="Training Accuracy")
plt.plot(neighbors, test_accuracies.values(), label="Testing Accuracy")

# Add a title, labels, and legend
plt.title("KNN: Varying Number of Neighbors")
plt.xlabel("Number of Neighbors")
plt.ylabel("Accuracy")
plt.legend()

# Show the plot
plt.show()

```

![](https://i.imgur.com/BWH7j2x.png)


As k increases beyond 15 we see overfitting where performance plateaus on both test and training sets, as indicated in this plot.  The peak test accuracy actually occurs at around 13 neighbors.