import squel from 'squel';

export const queryBuilder = () => {
  return squel.select({ autoQuoteAliasNames: false, separator: '\n' });
};

export const insertBuilder = () => {
  return squel.insert();
};

export const deleteBuilder = () => {
  return squel.delete({ autoQuoteAliasNames: false, separator: '\n' });
};

export const updateBuilder = () => {
  return squel.update({ autoQuoteAliasNames: false, separator: '\n' });
};
