# 🗄️ NINJA DEPLOYMENT GUIDE
## America's Got Problems — Institutional Artifact Deployment

**Version:** 1.0  
**Objective:** Permanent deployment with GitHub + Vercel + Internet Archive  
**Timeline:** ~30 minutes end-to-end  
**Mobile-Friendly:** Yes (all steps can be executed from mobile with GitHub mobile app)

---

## PHASE 1: GITHUB EXPORT (5 minutes)

### Step 1: Create GitHub Repository

```bash
# Option A: Via GitHub CLI (if available)
gh repo create agp-methodology --public --description "America's Got Problems: A Systems-Level Diagnosis of Hybrid Cognition"

# Option B: Via GitHub Web Interface
# 1. Go to github.com/new
# 2. Repository name: agp-methodology
# 3. Description: America's Got Problems: A Systems-Level Diagnosis of Hybrid Cognition
# 4. Public
# 5. Add MIT License
# 6. Create repository
```

### Step 2: Push Local Repository to GitHub

```bash
cd /home/ubuntu/americas-got-problems

# Add remote
git remote add origin https://github.com/[YOUR-USERNAME]/agp-methodology.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

- Visit: `https://github.com/[YOUR-USERNAME]/agp-methodology`
- Confirm all files present
- Confirm README visible
- Confirm LICENSE (MIT) visible

---

## PHASE 2: VERCEL DEPLOYMENT (10 minutes)

### Step 1: Connect Vercel to GitHub

```
1. Go to vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select "agp-methodology" repository
5. Framework preset: Next.js
6. Root directory: ./
7. Build command: npm run build
8. Output directory: out
9. Environment variables: (none required)
10. Deploy
```

### Step 2: Monitor Deployment

- Vercel will automatically build and deploy
- Deployment URL will be: `https://agp-methodology.vercel.app`
- Wait for "Deployment Complete" status

### Step 3: Test Live Site

- Visit deployment URL
- Verify all sections load
- Test audio player
- Check responsive design on mobile

### Step 4: Custom Domain (Optional, Later)

```
1. In Vercel dashboard, go to Settings > Domains
2. Add domain: agp.systems (if available)
3. Update DNS records per Vercel instructions
4. Verify domain connection
```

---

## PHASE 3: INTERNET ARCHIVE SUBMISSION (5 minutes)

### Step 1: Submit to Wayback Machine

```
1. Go to web.archive.org/save/
2. Enter Vercel URL: https://agp-methodology.vercel.app
3. Click "Save Page Now"
4. Wait for snapshot completion
5. Copy archive URL: https://web.archive.org/web/[TIMESTAMP]/https://agp-methodology.vercel.app
```

### Step 2: Update README with Archive Link

```bash
cd /home/ubuntu/americas-got-problems

# Edit README.md
# Update section III with:
# - Vercel deployment URL
# - Wayback Machine snapshot URL
# - Commit hash: 3b4c912

git add README.md
git commit -m "Update deployment URLs and archive links"
git push origin main
```

---

## PHASE 4: CRYPTOGRAPHIC VERIFICATION (5 minutes)

### Step 1: Generate SHA256 Hashes

```bash
# Audio file hash (already generated)
shasum -a 256 public/audio/agp-methodology-v1.wav
# Output: f379f1dee6e6edd98236407b77fa9d9b124405ef6dc5136d29df0470c8a24cf0

# Update README.md with this hash
```

### Step 2: Create Verification Instructions

Add to README.md:

```markdown
### Verification

To verify the integrity of this artifact:

**Audio File:**
```bash
shasum -a 256 agp-methodology-v1.wav
# Expected: f379f1dee6e6edd98236407b77fa9d9b124405ef6dc5136d29df0470c8a24cf0
```

**Git Commit:**
```bash
git log --oneline | head -1
# Expected: 3b4c912 Initial publication — AGP Hybrid Cognition Methodology v1.0
```
```

---

## PHASE 5: MOBILE-FRIENDLY CHECKLIST

### Testing on Mobile

- [ ] Visit Vercel URL on iPhone/Android
- [ ] Navigation menu responsive
- [ ] Audio player works on mobile
- [ ] Text readable (no horizontal scroll)
- [ ] Links clickable (tap targets > 44px)
- [ ] Images load correctly
- [ ] Transcript toggle functional

### Mobile Deployment Commands (via GitHub Mobile App)

1. Open GitHub mobile app
2. Navigate to agp-methodology repo
3. Create new file: `DEPLOYMENT_COMPLETE.md`
4. Add content:
   ```
   # Deployment Complete
   
   - Vercel URL: https://agp-methodology.vercel.app
   - GitHub Repo: https://github.com/[USERNAME]/agp-methodology
   - Wayback Archive: https://web.archive.org/web/*/agp-methodology.vercel.app
   - Commit Hash: 3b4c912
   - Publication Date: March 2026
   - Version: 1.0
   ```
5. Commit to main branch

---

## PHASE 6: FINAL VERIFICATION CHECKLIST

### Pre-Launch

- [ ] GitHub repository public and accessible
- [ ] Vercel deployment live and functional
- [ ] All sections load correctly
- [ ] Audio player functional
- [ ] Transcript toggle works
- [ ] Archive links present in footer
- [ ] README complete with metadata
- [ ] LICENSE (MIT) present
- [ ] Wayback Machine snapshot created

### Post-Launch

- [ ] Share deployment URL with stakeholders
- [ ] Monitor Vercel analytics
- [ ] Verify Wayback Machine snapshot
- [ ] Update domain DNS (if using custom domain)
- [ ] Create backup of repository

---

## QUICK REFERENCE: DEPLOYMENT URLS

| Component | URL |
|-----------|-----|
| **Live Site** | https://agp-methodology.vercel.app |
| **GitHub Repo** | https://github.com/[USERNAME]/agp-methodology |
| **Wayback Archive** | https://web.archive.org/web/*/agp-methodology.vercel.app |
| **Audio File** | https://d2xsxph8kpxj0f.cloudfront.net/.../agp-methodology-v1.wav |

---

## TROUBLESHOOTING

### Vercel Build Fails

```bash
# Check build locally
npm run build

# If error, fix and push:
git add .
git commit -m "Fix build error"
git push origin main

# Vercel will auto-rebuild
```

### Audio Not Playing

- Verify CDN URL is correct in page.tsx
- Check browser console for CORS errors
- Test audio file directly in browser

### Mobile Responsiveness Issues

- Test on actual device (not just browser DevTools)
- Check viewport meta tag in layout.tsx
- Verify Tailwind breakpoints are correct

---

## FUTURE EXTENSIONS

Once deployed, you can easily add:

1. **Custom Domain** → Vercel Settings > Domains
2. **Analytics** → Vercel Analytics or Plausible
3. **Email Capture** → Substack or Buttondown
4. **Monetization** → Stripe integration
5. **Additional Versions** → Create v1.1 branch

---

## INSTITUTIONAL CREDIBILITY SIGNALS

Your deployment now includes:

✅ GitHub version control with immutable commit history  
✅ Vercel production deployment with auto-scaling  
✅ Internet Archive permanent snapshot  
✅ SHA256 cryptographic verification  
✅ MIT License for transparency  
✅ Comprehensive README with academic citation format  
✅ Structured metadata in HTML head  
✅ Mobile-responsive design  

**This artifact will be citable in ten years.**

---

**Deployment Status:** Ready for execution  
**Estimated Time:** 30 minutes  
**Difficulty:** Beginner-friendly  
**Mobile-Compatible:** Yes  

Execute Phase 1–6 in order. Do not skip steps.
