const { constants: userRoles } = require('../../../Schema/UserRoles');
const checkToken = require('../../../Utils/CheckToken');

module.exports = async (_, { data }, { container, token }) => {
  const { DomainProfileRepository } = container;
  const { id } = data;

  checkToken(token, _, [userRoles.ADMIN, userRoles.SUPERADMIN]);

  return DomainProfileRepository.returnDomainData(id);
};
