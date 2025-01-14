import requests
import os

# Your GitHub username and token (optional)
username = 'your-github-username'  # Replace with your GitHub username
token = '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'  # Replace with your GitHub personal access token (if necessary)
print(token)

# GitHub API URL for rate limit
url = "https://api.github.com/rate_limit"

# Make a request to GitHub API with authentication if needed
headers = {}
if token:
    headers['Authorization'] = f'token {token}'

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    core_limit = data['resources']['core']['limit']
    core_remaining = data['resources']['core']['remaining']
    core_reset = data['resources']['core']['reset']
    
    # Convert reset time to a readable format
    from datetime import datetime
    reset_time = datetime.utcfromtimestamp(core_reset).strftime('%Y-%m-%d %H:%M:%S')

    print(f"API Rate Limit Information:")
    print(f"  Limit: {core_limit}")
    print(f"  Remaining: {core_remaining}")
    print(f"  Reset Time: {reset_time} UTC")
else:
    print(f"Failed to retrieve rate limit information. Status code: {response.status_code}")
    print(f"Error message: {response.text}")
