# RumorStreet – A GenAI-Powered Financial Learning Game

RumorStreet is a web-based financial simulation game designed to teach users how stock and crypto markets react to information such as real news, fake news, and rumors. The game recreates realistic market conditions using data from 2–3 years ago and AI-generated rumor patterns, allowing users to experience how emotions, misinformation, and timing influence investment decisions. The goal of RumorStreet is not to promote profit-making, but to build strong financial thinking, decision-making skills, and market awareness in a safe, risk-free environment.

Unlike traditional learning platforms that focus on theory, RumorStreet places users inside a living, dynamic market where information constantly flows, prices react, and every decision has consequences. Users learn by doing, failing, analyzing, and improving.

Core Idea

In real markets, prices do not move only because of company performance. They move because of how people react to information. Rumors spread faster than facts, fake news creates panic, and real news often gets misinterpreted. RumorStreet simulates this exact chaos using Generative AI and historical data, so users can understand how markets actually behave instead of how textbooks describe them.

Game Flow Overview

When the user enters RumorStreet, they are introduced through an immersive welcome screen with a dynamic animated background, setting the tone of a high-stakes financial world. After authentication, the user lands on the main city-map interface, which acts as the core gameplay environment.

On the left side of the screen, a continuous stream of rumors, fake news, and real historical news appears in real time, similar to live chat feeds. On the right side, a city map represents companies as buildings. Each building corresponds to a real-world company, and hovering over it reveals quick insights, while clicking allows deeper analysis and investment decisions.

From here, users can explore companies, invest or withdraw money, consult AI for feedback, learn concepts, write personal notes, or compete with other players.

AI Architecture (Three Dedicated AI Models)

RumorStreet uses three separate AI models, each trained and optimized for a specific role.

The first AI model is responsible for generating and managing rumors and fake news. It is trained on historical market events and rumor patterns from 2–3 years ago. This model ensures that the information stream feels realistic, emotionally triggering, and similar to how misinformation spreads in real markets, without using live or harmful data.

The second AI model acts as an interactive mentor. When users choose to “Play with AI,” this model analyzes their investment decisions, identifies mistakes, highlights missed signals, and explains what went wrong or right. It behaves like a personal financial coach rather than a chatbot.

The third AI model is designed purely for knowledge and education. It explains financial terms, metrics, indicators, and concepts in very simple language. It can also analyze uploaded company annual reports (PDFs) and extract or explain specific metrics the user wants to understand.

Page-by-Page Feature Explanation

The welcome page is highly interactive and visually rich, designed to immediately immerse the user in the experience. Navigation begins only after a user interaction, reinforcing engagement.

The authentication page allows login via Google or email using Firebase. The background remains consistent with the welcome page but slightly blurred to maintain focus on authentication.

The home page is the heart of the game. A disclaimer briefly explains that the game includes real and fake information to simulate real market behavior. The left panel continuously displays rumors and news, while the right panel shows the interactive city map. A navigation bar allows access to portfolio, account, tutorials, and search.

Clicking on a company opens the company information page, where users see all rumors related to that company, key financial metrics, and options to invest or withdraw virtual money. These metrics are inspired by real platforms like Finology but simplified for learning.

The portfolio page displays a complete investment history similar to real demat accounts, helping users understand timing, pricing, and portfolio growth or decline.

The account page contains personal details and settings such as sound control, ensuring no real money or banking information is ever involved.

The leaderboard page ranks users based on performance over fixed intervals and rewards top performers with in-game currency. This encourages long-term engagement and healthy competition.

The “Build Financial IQ” section is a dedicated learning hub with a vertical navigation layout. It explains financial concepts, indicators, and strategies, while also giving users access to a private notes section where they can freely write and store personal insights.

The “Play with AI” section introduces rule-based AI gameplay where users compete against an intelligent agent that adapts to their behavior.

The “Learn with AI” page provides a chat-based interface similar to ChatGPT, focused entirely on market education and company analysis.

The tournament section allows users to compete with others in metric-based quizzes, short-term trading battles, or long-term investing challenges, simulating different market strategies.

Why RumorStreet Matters

RumorStreet bridges the gap between theory and reality. It teaches users not just what markets are, but how they behave under pressure. It helps users recognize manipulation, emotional traps, and poor decision-making habits before they face real financial loss.
