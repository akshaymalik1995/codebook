 Let's discuss how we can build a classification model, or classifier, to predict the labels of unseen data.

**Dataset columns:**

```python
churn_df.columns
# Index(['account_length', 'total_day_charge', 'total_eve_charge', 'total_night_charge', 'total_intl_charge', 'customer_service_calls', 'churn'], dtype='object')
```


## Classifying labels of unseen data

There are four steps. 
1. First, we build a classifier, which learns from the labeled data we pass to it. 
2. We then pass it unlabeled data as input, and have it predict labels for this unseen data. 
3. As the classifier learns from the labeled data, we call this the training data.

## k-Nearest Neighbors

Let's build our first model! We'll use an algorithm called k-Nearest Neighbors, which is popular for classification problems. The idea of k-Nearest Neighbors, or KNN, is to predict the label of any data point by looking at the `k`, for example, three, closest labeled data points and getting them to vote on what label the unlabeled observation should have. KNN uses majority voting, which makes predictions based on what label the majority of nearest neighbors have.

Using this scatter plot as an example, how do we classify the black observation?

![](https://i.imgur.com/WdraFhe.png)

If k equals three, we would classify it as red. This is because two of the three closest observations are red.

![](https://i.imgur.com/rYXhqXK.png)

If k equals five, we would instead classify it as blue.

![](https://i.imgur.com/CEwBDNM.png)


## KNN Intuition

To build intuition for KNN, let's look at this scatter plot displaying total evening charge against total day charge for customers of a telecom company. The observations are colored in blue for customers who have churned, and red for those who have not churned.


![](https://i.imgur.com/4WA2HuM.png)

Here we have visualized the results of a KNN algorithm where the number of neighbors is set to 15.

![](https://i.imgur.com/IHPqLuf.png)


KNN creates a decision boundary to predict if customers will churn. Any customers in the area with a gray background are predicted to churn, and those in the area with a red background are predicted to not churn. This boundary would be used to make predictions on unseen data.

## Using scikit-learn to fit a classifier

```python
from sklearn.neighbors import KNeighborsClassifier
# scikit-learn requires that the features are in an array where each column is a feature and each row a different observation.
X = churn_df[['total_day_charge', 'total_eve_charge']].values
# Similarly, the target needs to be a single column with the same number of observations as the feature data.
y = churn_df['churn'].values
knn = KNeighborsClassifier(n_neighbors=15)
knn.fit(X,y)
X_new = np.array(
	[[56.8, 17.5]
	[24.4, 24.1],
	[56.1, 10.9]]
)
predictions = knn.predict(X_new)
```