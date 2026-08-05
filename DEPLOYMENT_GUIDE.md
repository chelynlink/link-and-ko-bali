# Publish Link & Ko Bali with GitHub and Vercel

## 1. Create the GitHub repository

1. Open https://github.com/new
2. Repository name: `link-ko-bali`
3. Choose **Private** or **Public**.
4. Do not add a README, `.gitignore`, or license because they are already included.
5. Select **Create repository**.

## 2. Upload this source code

1. Extract the ZIP file on your computer.
2. Open the empty GitHub repository.
3. Select **uploading an existing file** or **Add file → Upload files**.
4. Upload all files and folders inside `link-ko-bali-github-vercel`.
5. Select **Commit changes**.

Important: upload the contents of the folder, so `package.json`, `app`, and `public` are visible at the top level of the repository.

## 3. Publish with Vercel

1. Open https://vercel.com/new
2. Sign in with the same GitHub account.
3. Import the `link-ko-bali` repository.
4. Vercel should detect **Next.js** automatically.
5. Keep the default build settings and select **Deploy**.

Vercel will provide a public URL after the deployment completes.

## 4. Update the website later

Edit or upload the changed files to the same GitHub repository and commit them. Vercel will automatically publish the new version.
