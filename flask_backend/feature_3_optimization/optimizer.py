import random
import numpy as np

class EpsilonGreedyBandit:
    """
    A simulator for the Epsilon-Greedy Multi-Armed Bandit algorithm.
    It balances showing the best-known ad (exploitation) with trying
    new ads to see if they are better (exploration).
    """
    def __init__(self, num_ads, epsilon=0.1):
        """
        Initializes the bandit.
        
        Args:
            num_ads (int): The number of ads (or "arms") to choose from.
            epsilon (float): The probability of exploring (choosing a random ad).
        """
        self.num_ads = num_ads
        self.epsilon = epsilon
        # Track how many times each ad is shown
        self.ad_counts = [0] * num_ads
        # Track how many times each ad is clicked
        self.ad_clicks = [0] * num_ads

    def select_ad(self):
        """
        Selects an ad to show based on the epsilon-greedy strategy.
        """
        # With probability epsilon, choose a random ad (explore)
        if random.random() < self.epsilon:
            return random.randrange(self.num_ads)
        
        # Otherwise, choose the ad with the highest known CTR (exploit)
        else:
            ctrs = [
                (self.ad_clicks[i] / self.ad_counts[i]) if self.ad_counts[i] > 0 else 0
                for i in range(self.num_ads)
            ]
            return np.argmax(ctrs)

    def update(self, ad_index, was_clicked):
        """
        Updates the history for the ad that was just shown.
        """
        self.ad_counts[ad_index] += 1
        if was_clicked:
            self.ad_clicks[ad_index] += 1
