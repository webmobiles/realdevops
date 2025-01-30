#  01-Helm-Named-Templates-With-Parameters
## Real devops with real apps

Video: 
https://www.youtube.com/watch?v=-Fcmo0o3Tkw


If you're passing a dictionary as a parameter to a named template, the template loses access to the parent context (e.g., .Values, .Release, etc.) unless explicitly passed or preserved.



To fix this, you need to pass the parent context (e.g., .) along with your parameters. Here's how you can do it:

1. Pass the Parent Context Explicitly: