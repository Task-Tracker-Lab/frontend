export type PluralForms = Record<Intl.LDMLPluralRule, string>;

const pluralRulesByLocale = new Map<string, Intl.PluralRules>();

function getPluralRules(locale: string) {
  let rules = pluralRulesByLocale.get(locale);

  if (!rules) {
    rules = new Intl.PluralRules(locale);
    pluralRulesByLocale.set(locale, rules);
  }

  return rules;
}

export function getPluralForm(count: number, forms: PluralForms, locale = 'ru') {
  return forms[getPluralRules(locale).select(count)];
}
