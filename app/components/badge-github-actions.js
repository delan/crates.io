import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  repository: alias('badge.attributes.repository'),
  workflowQuery: computed('badge.attributes.workflow_name', 'badge.attributes.workflow_file_path', function() {
    const nameOrFilePath = this.get('badge.attributes.workflow_name') || this.get('badge.attributes.workflow_file_path');
    return encodeURIComponent(`workflow:${nameOrFilePath}`);
  }),
  workflowNameOrFilePath: computed('badge.attributes.workflow_name', 'badge.attributes.workflow_file_path', function() {
    const name = this.get('badge.attributes.workflow_name');
    return name ? encodeURIComponent(name) : this.get('badge.attributes.workflow_file_path');
  }),
  search: computed('badge.attributes.branch', function() {
    const entries = [];

    if (this.get('badge.attributes.branch')) {
      entries.push(`branch=${encodeURIComponent(this.get('badge.attributes.branch'))}`);
    }

    if (this.get('badge.attributes.event')) {
      entries.push(`event=${encodeURIComponent(this.get('badge.attributes.event'))}`);
    }

    return entries.join('&');
  }),
  text: computed('badge.attributes.branch', function() {
    const branch = this.get('badge.attributes.branch');
    return `GitHub Actions build status for the ${branch ? `“${branch}”` : 'default'} branch`;
  }),
});
