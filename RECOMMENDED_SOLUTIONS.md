# Recommended Solutions for Astro Frontmatter

## Current Issue
`Astro.glob()` is deprecated and doesn't properly type `frontmatter` for `.astro` files.

## ⭐ BEST SOLUTION: Use a Data File (Cleanest & Type-Safe)

### Step 1: Use the data file
Replace the `Astro.glob()` call in `src/pages/index.astro`:

```typescript
---
import Navbar from '../components/Navbar.astro';
import Layout from '../layouts/Layout.astro';
import '../styles/global.css';
import { applications } from '../data/applications';

const appList = applications;
---
```

### Pros:
- ✅ Fully type-safe
- ✅ No deprecation warnings
- ✅ Single source of truth
- ✅ Easy to maintain
- ✅ Fast (no file system operations)

### Cons:
- ⚠️ Need to manually update the data file when adding new applications

---

## ALTERNATIVE: Content Collections (Most "Astro Way")

### Step 1: Convert to Markdown/MDX
Move your application content to `src/content/applications/`:

```
src/content/
  applications/
    barcode.md
    tracking.md
    inspection.md
    measure.md
```

### Step 2: Add frontmatter to each file
```markdown
---
title: 'Barcode'
icon: '🎯'
image: '/public/cover-barcode.png'
---

# Barcode Content Here
```

### Step 3: Use getCollection()
```typescript
---
import { getCollection } from 'astro:content';

const applications = await getCollection('applications');
const appList = applications.map(app => ({
  title: app.data.title,
  icon: app.data.icon,
  image: app.data.image,
  href: `/applications/${app.slug}`,
}));
---
```

### Step 4: Create dynamic route
Create `src/pages/applications/[slug].astro`:

```typescript
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/Application.astro';

export async function getStaticPaths() {
  const applications = await getCollection('applications');
  return applications.map(app => ({
    params: { slug: app.slug },
    props: { app },
  }));
}

const { app } = Astro.props;
const { Content } = await app.render();
---

<BaseLayout>
  <h1>{app.data.title}</h1>
  <Content />
</BaseLayout>
```

### Pros:
- ✅ Fully type-safe with schema validation
- ✅ Recommended by Astro
- ✅ Great for content-heavy sites
- ✅ Automatic slug generation

### Cons:
- ⚠️ Requires restructuring your current `.astro` files
- ⚠️ More setup work

---

## QUICK FIX: Type Assertion (Already Applied)

This is what I already did - using `(app as any).frontmatter`.

### Pros:
- ✅ Works immediately
- ✅ No restructuring needed

### Cons:
- ⚠️ `Astro.glob()` is deprecated
- ⚠️ Less type safety
- ⚠️ Not the "Astro way"

---

## My Recommendation

**For your use case (small number of applications with static metadata):**

Use **Option 1: Data File** - It's the cleanest, fastest, and most maintainable solution.

**If you plan to have lots of content or frequently changing applications:**

Use **Option 2: Content Collections** - It's more scalable and the "Astro way".

