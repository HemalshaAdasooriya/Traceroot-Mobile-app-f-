# Traceroot-Mobile-app 🌱

### TraceRoot – Farm-to-Buyer Agricultural Contact and Transparency System

## About the Project

**TraceRoot** is a mobile application designed to connect farmers, agricultural suppliers, and buyers. It helps farmers record their cultivation activities and share information about how their crops are grown.

Buyers can view cultivation history, learn about farming practices, find suitable products, and contact farmers directly. The system aims to improve transparency, trust, and communication in the agricultural supply chain.

## Project Objectives

- Connect farmers directly with buyers.
- Record and share cultivation activities.
- Improve transparency in the farming process.
- Help buyers learn how crops are cultivated.
- Support communication between farmers, suppliers, and buyers.
- Support contract farming and agricultural product orders.

## Main Features

- **Farmer Management:** Create farmer profiles and manage farming information.
- **Crop Management:** Select crops and add new crops when needed.
- **Cultivation History:** Record farming activities with photos, dates, times, and location information where available.
- **Buyer Module:** Search for farmers and crops, view cultivation history, and contact farmers.
- **Supplier Module:** Support connections between farmers and agricultural suppliers.
- **Contract Farming:** Support agreements and communication between farmers and buyers.
- **Admin Module:** Manage users and oversee platform activities.

## Group Members

| Name | Registration Number | Assigned Module |
|---|---|---|
| K.G.T.R. Karunajeewa | 22CSE0377 | Farmer & Cultivation History |
| A.M.H.B. Adasooriya | 22CSE0365 | Buyer & Supplier |
| W.M.V. Chamith | 22CSE0384 | Contract Farming & Farmer |
| M.A.F. Nuha | 22CSE0397 | Admin & Buyer |

## Project Information

- **Course:** SE5104 Mini Project
- **Academic Batch:** 2022/2023
- **Internal Supervisor:** Mr. Dimuthu Lakshan
- **Mentor:** Ajeem Abdul Wahid

## Proposed Technologies

The following technologies are proposed for the project. The final technology stack may be updated based on the team's implementation decisions.

- **Mobile Application:** React Native
- **Backend:** Node.js and Express.js
- **Database:** PostgreSQL
- **API:** REST API
- **Authentication:** JSON Web Tokens (JWT)
- **Photo Storage:** Cloud storage
- **Device Features:** Camera and GPS, where required
  
## 🎨 UI/UX Design

The TraceRoot mobile application design is created using Figma. The design plan presents the user interface and screen layout for the application.

**Figma Design:** [View TraceRoot UI/UX Design](https://www.figma.com/make/8JP0sObB9oWoS1bai6HQ1c/Refine-Figma-Design-Plan--Copy-?p=f&t=7WJKpQ3tB9MOygmq-0&fullscreen=1)

## 🌿 GitHub Workflow

Our team uses Git and GitHub to collaborate. Each member develops their assigned features on their own branch. Completed work is reviewed before being merged into the shared project.

### Branch Structure

- `main` – The stable and tested version of the project.
- `develop` – The shared branch for integrating team members' work.
- Individual branches – Each member's branch for developing assigned features.

**Note:** The team should create the `develop` branch on GitHub before using this workflow.

### Daily Development Process

#### 1. Update Your Branch Before Starting Work

First, download the latest branch information and switch to your own branch.

```bash
git fetch origin
git switch <your-branch>
git merge origin/develop
```

Replace `<your-branch>` with your own branch name. This updates your branch with the latest changes from `develop`.

#### 2. Develop Your Assigned Feature

Work on your own branch and focus on your assigned module. Avoid making changes directly to `main` or `develop`.

#### 3. Commit and Push Your Changes

After making and testing your changes, save them in Git and push them to your branch.

```bash
git add .
git commit -m "Describe your changes"
git push origin <your-branch>
```

Use a clear commit message that explains what you changed.

#### 4. Create a Pull Request

Create a Pull Request (PR) on GitHub **when your feature or a suitable unit of work is ready for review**.

- **Base branch:** `develop`
- **Compare branch:** Your own branch

Describe your changes and make sure the work is ready to be reviewed.

#### 5. Team Lead Reviews and Merges

The team lead reviews the code, checks the changes, and handles any merge conflicts. Once approved, the PR is merged into `develop`.

#### 6. Keep Your Branch Updated

Before continuing work, update your branch with the latest changes from `develop`.

```bash
git fetch origin
git switch <your-branch>
git merge origin/develop
```

#### 7. Update the Main Branch

After the integrated project has been tested and is ready for release, the team lead merges `develop` into `main`.

### Team Collaboration Rules

- Each member works on their own branch.
- Update your branch before starting new work.
- Commit and push changes regularly.
- Test your work before creating a Pull Request.
- Use clear commit messages.
- The team lead reviews and merges Pull Requests.
- Communicate with team members when changes affect shared features or files.

##  Project Goal
Our goal is to develop a user-friendly mobile application that improves agricultural transparency and helps farmers, suppliers, and buyers connect more easily.

---

**Repository:** [Traceroot-Mobile-app](https://github.com/rumeshikakarunajeewa/Traceroot-Mobile-app)

**Developed as part of the SE5104 Mini Project.**
