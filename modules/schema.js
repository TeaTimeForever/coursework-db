var models = {
	institutes: {
		table: 'institutes',
		key: 'id',
		relations: {
			students: {
				type: 'many',
	  		model: 'students',
	  		join: {
	  			id: 'institute_id'
	  		}
			},
			projects: {
				type: 'one',
	  		model: 'projects',
	  		join: {
	  			id: 'university_id'
	  		}
			},
			teachers: {
				type: 'many',
				model: 'teachers',
				join:{
					id: 'university_id'
				}
			}
		}
	},
	students: {
		table: 'students',
		key: 'personal_code',
		methods: {
			fullname: function(){
				return this.firstname + " " + this.lastname;
			}
		},
		relations: {
			institute: {
				type: 'one',
				model: 'institutes',
				join: {
					institute_id: 'id'
				}
			},
			membership: {
				type: 'one',
				model: 'teamMemb',
				join: {
					personal_code: 'personal_code'
				}
			}
		}
	},
	projects: {
		table: 'projects',
		key: 'id',
		relations: {
			institute: {
				type: 'one',
				model: 'institutes',
				join: {
					institute_id: 'id'
				}
			},
			team: {
				type: 'one',
				model: 'teams',
				join: {
					id: 'project_id'
				}
			}
		}
	},
	teachers: {
		table: 'teachers',
		key: 'personal_code',
		relations: {
			institute: {
				type: 'one',
				model: 'institutes',
				join: {
					institute_id: 'id'
				}
			}
		}
	},
	teams: {
		table: 'teams',
		key: 'id',
		relations: {
			project: {
				type: 'one',
				model: 'projects',
				join: {
					project_id: 'id'
				}
			},
			members: {
				type: 'many',
				model: 'teamMemb',
				join: {
					id: 'team_id'	
				}
			}
		}
	},
	teamMemb: {
		table: 'team_members',
		key: 'personal_code',
		relations: {
			team: {
				type: 'one',
				model: 'teams',
				join: {
					team_id: 'id'
				}
			},
			students: {
				type: 'one',
				model: 'students',
				join: {
					personal_code: 'personal_code'
				}
			}
		}
	}
}

module.exports = models;
