<div align="center">

<img src="packages/docs/src/assets/logo.svg" alt="Rapid Form" width="64" height="64" />

# Rapid Form

**The 2KB React form hook that just works.**  
No `register()`. No re-renders. Schema validation optional.

[![npm version](https://img.shields.io/npm/v/rapid-form?style=flat-square&color=7C3AED)](https://www.npmjs.com/package/rapid-form)
[![npm downloads](https://img.shields.io/npm/dm/rapid-form?style=flat-square&color=7C3AED)](https://www.npmjs.com/package/rapid-form)
[![GitHub stars](https://img.shields.io/github/stars/Randagio13/rapid-form?style=flat-square&color=7C3AED)](https://github.com/Randagio13/rapid-form/stargazers)
[![CI](https://img.shields.io/github/actions/workflow/status/Randagio13/rapid-form/ci.yml?style=flat-square&color=7C3AED&label=CI)](https://github.com/Randagio13/rapid-form/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/rapid-form?style=flat-square&color=7C3AED)](LICENSE)

[**Documentation →**](https://randagio13.github.io/rapid-form)

</div>

---

## Why Rapid Form?

| | rapid-form | react-hook-form |
|---|---|---|
| Bundle size (gzip) | **~2KB** | ~10KB |
| Dependencies | **0** | 0 |
| Register inputs | **No** | Yes |
| Re-renders on input | **No** | Yes |
| Native HTML validation | **Yes** | Partial |
| Schema validation | **Zod / Yup / any** | Zod / Yup / any |
| Dynamic fields | **Yes** | Yes |

Point a `ref` at your form. Done.

## Installation

```bash
# npm
npm install rapid-form

# yarn
yarn add rapid-form

# pnpm
pnpm add rapid-form
```

**Peer dependencies:** React ≥16.9

## Quick Start

```tsx
import { useRapidForm } from 'rapid-form';

export function ContactForm() {
  const { refValidation, errors } = useRapidForm();

  return (
    <form ref={(ref) => refValidation(ref)}>
      <input name="email" type="email" required placeholder="you@example.com" />
      {errors.email?.isInvalid && <span>{errors.email.message}</span>}

      <input name="name" required placeholder="Your name" />
      {errors.name?.isInvalid && <span>{errors.name.message}</span>}

      <button type="submit">Send</button>
    </form>
  );
}
```

Any `input`, `select`, or `textarea` with `name` + `required` is automatically validated — no `register()`, no `Controller`, no wrappers.

## Validation on change / blur

```tsx
const { refValidation, errors } = useRapidForm();

refValidation(ref, { eventType: 'blur' });
```

## Custom validation

```tsx
refValidation(ref, {
  validations: {
    username: {
      validation: (value) => value.length >= 3,
      message: 'At least 3 characters',
    },
  },
});
```

## Schema validation (Zod / Yup)

```tsx
import { z } from 'zod';
import { zodResolver } from 'rapid-form/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name:  z.string().min(3, 'At least 3 characters'),
});

const { refValidation, errors } = useRapidForm();
refValidation(ref, { resolver: zodResolver(schema) });
```

A `yupResolver` is also available at `rapid-form/resolvers/yup`. Both adapters are tree-shakeable and add zero runtime dependencies to the core package.

## Dynamic fields

Conditional fields and field arrays are tracked automatically — no extra setup needed.

```tsx
function ConditionalForm() {
  const [showExtra, setShowExtra] = useState(false);
  const { refValidation, errors } = useRapidForm();

  return (
    <form ref={(ref) => refValidation(ref)}>
      <input type="checkbox" name="agree" required onChange={(e) => setShowExtra(e.target.checked)} />
      {showExtra && <input type="text" name="extra" required />}
      {errors.extra?.isInvalid && <span>{errors.extra.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Read values

```tsx
const { refValidation, errors, values } = useRapidForm();
// values.fieldName — current field value
```

## Documentation

Full API reference, guides, and examples:  
**[randagio13.github.io/rapid-form](https://randagio13.github.io/rapid-form)**

## Contributing

1. Fork the [repository](https://github.com/Randagio13/rapid-form)
2. Clone your fork and create a branch
3. Make your changes and open a pull request

## License

[MIT](LICENSE) © [Alessandro Casazza](https://github.com/Randagio13)
