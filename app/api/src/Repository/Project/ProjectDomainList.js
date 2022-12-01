const { Op } = require('sequelize');
const { constants: userOption } = require('../../Schema/UserOption');
const { constants: projectOption } = require('../../Schema/ProjectOption');
const { constants: domainOption } = require('../../Schema/DomainOption');

/**
 * @class ProjectDomainList
 * @classdesc - ProjectDomainList For Collector
 * @todo - not used yet
 */
class ProjectDomainList {
  constructor({ sequelize }) {
    this.sequelize = sequelize;
  }

  async getProjectDomainList() {
    const { Project, Domain, User } = this.sequelize.models;

    const allProject = await Domain.findAll({
      attributes: ['domain', 'wildcardDomain'],
      where: {
        enabled: true,
        [Op.not]: {
          options: {
            [Op.contains]: [domainOption.DELETED],
          },
        },
        options: {
          [Op.contains]: [domainOption.ACTIVE],
        },
      },
      include: [
        {
          model: Project,
          attributes: ['publicToken', 'privateToken'],
          where: {
            enabled: true,
            [Op.not]: {
              options: {
                [Op.contains]: [projectOption.DELETED],
              },
            },
            options: {
              [Op.contains]: [projectOption.ACTIVE],
            },
          },
          required: true,
          include: [
            {
              model: User,
              attributes: [],
              where: {
                [Op.not]: {
                  options: {
                    [Op.contains]: [userOption.DELETED],
                  },
                },
                options: {
                  [Op.contains]: [userOption.ACTIVE],
                },
              },
              required: true,
            },
          ],
        },
      ],
    });

    const result = {};
    allProject.forEach((project) => {
      const { publicToken, privateToken } = project.dataValues.Project;
      const { domain, wildcardDomain } = project.dataValues;
      if (!result[`${publicToken}`]) {
        result[`${publicToken}`] = {
          p: privateToken,
          d: [],
          w: [],
        };
      }
      if (domain) {
        result[`${publicToken}`].d.push(domain);
      }
      if (wildcardDomain) {
        result[`${publicToken}`].w.push(wildcardDomain);
      }
    });

    return result;
  }
}

module.exports = ProjectDomainList;
