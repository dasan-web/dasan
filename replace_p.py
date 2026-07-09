import re
import os

files = [
    "c:/Share/DASAN/src/app/about/[[...slug]]/page.tsx",
    "c:/Share/DASAN/src/app/business/[[...slug]]/page.tsx",
    "c:/Share/DASAN/src/app/contact/[[...slug]]/page.tsx",
    "c:/Share/DASAN/src/app/rd/[[...slug]]/page.tsx"
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <p className="...">{var}</p>
    # Note: we also want to handle newlines
    pattern = re.compile(r'<p className="([^"]+)">\s*\{([a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)?)\}\s*</p>')
    
    def replacer(match):
        classes = match.group(1)
        var_expr = match.group(2)
        # Check if the var is a string that might contain HTML
        
        # We only want to convert the ones that are simple variables, 
        # but wait, the prompt says check for desc.includes('<p') || desc.includes('<h')
        
        # We need to turn classes like "text-gray-600 text-sm leading-relaxed whitespace-pre-wrap"
        # into arbitrary variants.
        # Simplest is: "[&_p]:text-gray-600 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:whitespace-pre-wrap"
        # Also need to add something like [&_h3] or whatever? The prompt says "match the exact original styling of the plain text implementation."
        
        # Let's map classes to variants:
        variants = " ".join([f"[&_p]:{c} [&_h4]:font-bold [&_strong]:font-bold" if i == 0 else f"[&_p]:{c}" for i, c in enumerate(classes.split())])
        
        # We should also retain the original wrapper classes for the div, maybe?
        # Actually, if we use a div, we can just apply the classes to the div itself, 
        # and also add the arbitrary variants for inner tags if needed, 
        # or maybe we can just give the div the same classes, but that would apply to the div, not the p inside.
        # But `dangerouslySetInnerHTML` will put `<p>` inside the `<div>`.
        # So we should apply the classes to `div` AND use variants for `p`?
        # Or just use the original classes on the div, and the styling inherits!
        # Tailwind classes like `text-sm text-gray-500 leading-relaxed` DO inherit!
        # The only issue is `whitespace-pre-wrap` which applies to the div.
        # Wait, if the HTML from the DB has `<p>`, it might have its own margins.
        # The prompt specifically says:
        # renders a <div dangerouslySetInnerHTML={{__html: desc}} className="..."/> using Tailwind arbitrary variants (e.g., `[&_p]:mb-5 [&_p]:text-gray-600 [&_h4]:font-bold [&_strong]:font-bold`) to match the exact original styling of the plain text implementation.

        return f'''{{(typeof {var_expr} === 'string' && ({var_expr}.includes('<p') || {var_expr}.includes('<h'))) ? (
  <div dangerouslySetInnerHTML={{{{ __html: {var_expr} }}}} className="{variants}" />
) : (
  <p className="{classes}">{{{var_expr}}}</p>
)}}'''

    new_content = pattern.sub(replacer, content)
    
    # Let's also check for cases where it's wrapped in {var} without {} inside p.
    # What about {item.desc}? Yes, var_expr covers that if we allow dots.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

for f in files:
    process_file(f)
