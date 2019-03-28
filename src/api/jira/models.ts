interface IPriority {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
}

type AvatarUrls = {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
};

interface IUser {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: AvatarUrls;
    displayName: string;
    active: boolean;
    timeZone: string;
}

interface IStatus {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
    };
}

interface IProject {
    self: string;
    id: string;
    key: string;
    name: string;
    avatarUrls: AvatarUrls;
    projectCategory: {
        self: string;
        id: string;
        description: string;
        name: string;
    };
}

interface IFields {
    fixVersions: [];
    customfield_13860: null;
    customfield_12411: null;
    customfield_13500: null;
    resolution: null;
    customfield_12413: null;
    customfield_13502: null;
    customfield_12412: null;
    customfield_13501: null;
    customfield_10500: null;
    customfield_12800: null;
    customfield_13856: null;
    customfield_12802: null;
    customfield_13858: null;
    customfield_12801: null;
    customfield_12804: null;
    customfield_12803: null;
    customfield_13859: null;
    customfield_12806: null;
    customfield_12805: null;
    customfield_12808: null;
    customfield_12807: null;
    customfield_12809: null;
    lastViewed: '2019-03-28T10:58:04.055+0000';
    customfield_13850: null;
    priority: IPriority;
    customfield_13852: null;
    customfield_13851: null;
    labels: [];
    customfield_11700: [
        {
            self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/11200';
            value: 'None/BE';
            id: '11200';
        }
    ];
    customfield_13845: null;
    customfield_13844: [
        {
            self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/13174';
            value: 'All';
            id: '13174';
        }
    ];
    customfield_11702: null;
    customfield_13847: null;
    customfield_13846: null;
    aggregatetimeoriginalestimate: null;
    timeestimate: null;
    versions: [];
    customfield_13848: null;
    issuelinks: [];
    assignee: IUser;
    status: IStatus;
    components: [];
    customfield_13200: null;
    customfield_13841: null;
    customfield_13840: null;
    customfield_13843: null;
    customfield_13842: null;
    customfield_13600: '{summaryBean=com.atlassian.jira.plugin.devstatus.rest.SummaryBean@3e092817[summary={pullrequest=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@1ce4a75e[overall=com.atlassian.jira.plugin.devstatus.summary.beans.PullRequestOverallBean@37f498e8[stateCount=0,state=OPEN,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], build=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@76a03b55[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BuildOverallBean@19efc06[failedBuildCount=0,successfulBuildCount=0,unknownBuildCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], review=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@3879653c[overall=com.atlassian.jira.plugin.devstatus.summary.beans.ReviewsOverallBean@2bd99903[stateCount=1,state=REVIEW,dueDate=2019-04-01T09:30:00.000+0000,overDue=false,count=1,lastUpdated=2019-03-28T10:25:20.257+0000,lastUpdatedTimestamp=2019-03-28T10:25:20.257Z],byInstanceType={fecru=com.atlassian.jira.plugin.devstatus.summary.beans.ObjectByInstanceTypeBean@286eab0a[count=1,name=FishEye / Crucible]}], deployment-environment=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@2a5cdcfe[overall=com.atlassian.jira.plugin.devstatus.summary.beans.DeploymentOverallBean@597f1c0c[topEnvironments=[],showProjects=false,successfulCount=0,count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], repository=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@3e8997a1[overall=com.atlassian.jira.plugin.devstatus.summary.beans.CommitOverallBean@410fec4b[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}], branch=com.atlassian.jira.plugin.devstatus.rest.SummaryItemBean@df873b8[overall=com.atlassian.jira.plugin.devstatus.summary.beans.BranchOverallBean@2c469177[count=0,lastUpdated=<null>,lastUpdatedTimestamp=<null>],byInstanceType={}]},errors=[],configErrors=[]], devSummaryJson={"cachedValue":{"errors":[],"configErrors":[],"summary":{"pullrequest":{"overall":{"count":0,"lastUpdated":null,"stateCount":0,"state":"OPEN","open":true},"byInstanceType":{}},"build":{"overall":{"count":0,"lastUpdated":null,"failedBuildCount":0,"successfulBuildCount":0,"unknownBuildCount":0},"byInstanceType":{}},"review":{"overall":{"count":1,"lastUpdated":"2019-03-28T10:25:20.257+0000","stateCount":1,"state":"REVIEW","dueDate":"2019-04-01T09:30:00.000+0000","overDue":false,"completed":false},"byInstanceType":{"fecru":{"count":1,"name":"FishEye / Crucible"}}},"deployment-environment":{"overall":{"count":0,"lastUpdated":null,"topEnvironments":[],"showProjects":false,"successfulCount":0},"byInstanceType":{}},"repository":{"overall":{"count":0,"lastUpdated":null},"byInstanceType":{}},"branch":{"overall":{"count":0,"lastUpdated":null},"byInstanceType":{}}}},"isStale":false}}';
    customfield_12503: null;
    customfield_12502: null;
    customfield_12900: null;
    aggregatetimeestimate: null;
    customfield_12902: null;
    customfield_12904: null;
    customfield_13839: null;
    creator: IUser;
    customfield_14000: null;
    subtasks: [];
    customfield_14003: null;
    customfield_14004: null;
    reporter: IUser;
    customfield_14001: null;
    customfield_14002: null;
    aggregateprogress: {
        progress: 0;
        total: 0;
    };
    customfield_13314: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/12815';
        value: 'ALL';
        id: '12815';
    };
    customfield_13705: null;
    progress: {
        progress: 0;
        total: 0;
    };
    votes: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/issue/ACCOUNT-7651/votes';
        votes: 0;
        hasVoted: false;
    };
    worklog: {
        startAt: 0;
        maxResults: 20;
        total: 0;
        worklogs: [];
    };
    issuetype: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/issuetype/3';
        id: '3';
        description: 'A task that needs to be done.';
        iconUrl: 'https://jira.tuenti.io/jira/secure/viewavatar?size=xsmall&avatarId=12818&avatarType=issuetype';
        name: 'Task';
        subtask: false;
        avatarId: 12818;
    };
    timespent: null;
    project: IProject;
    customfield_11000: null;
    aggregatetimespent: null;
    customfield_11004: '9223372036854775807';
    customfield_11005: null;
    customfield_13820: null;
    customfield_13416: null;
    customfield_13812: null;
    customfield_13811: null;
    customfield_13814: null;
    customfield_13417: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/12454';
        value: 'No';
        id: '12454';
    };
    customfield_13813: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/13034';
        value: 'No';
        id: '13034';
    };
    customfield_13815: null;
    customfield_13818: null;
    resolutiondate: null;
    customfield_13819: null;
    workratio: -1;
    watches: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/issue/ACCOUNT-7651/watchers';
        watchCount: 1;
        isWatching: true;
    };
    created: '2019-03-28T09:12:03.000+0000';
    customfield_12600: null;
    customfield_13414: [
        {
            self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/12440';
            value: 'All';
            id: '12440';
        }
    ];
    customfield_13810: null;
    customfield_11900: null;
    customfield_13803: null;
    customfield_13409: {
        self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/12420';
        value: 'No';
        id: '12420';
    };
    customfield_13805: null;
    customfield_13804: null;
    customfield_13806: null;
    customfield_13809: null;
    customfield_13808: null;
    updated: '2019-03-28T09:12:03.000+0000';
    timeoriginalestimate: null;
    customfield_13001: null;
    description: 'Prueba';
    customfield_13000: null;
    customfield_11100: null;
    customfield_13403: [
        {
            self: 'https://jira.tuenti.io/jira/rest/api/2/customFieldOption/12700';
            value: 'All';
            id: '12700';
        }
    ];
    timetracking: {};
    customfield_12701: null;
    customfield_12700: null;
    attachment: [];
    summary: string;
    customfield_10001: null;
    customfield_12300: '1|zg0ep4:';
    customfield_12415: null;
    customfield_13900: null;
    customfield_11600: null;
    customfield_13503: null;
    environment: null;
    customfield_13902: null;
    customfield_13904: null;
    duedate: null;
    comment: {
        comments: [];
        maxResults: 0;
        total: 0;
        startAt: 0;
    };
}

export interface IJiraTask {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: IFields;
    renderedFields: {
        fixVersions: null;
        customfield_13860: null;
        customfield_12411: '';
        customfield_13500: null;
        resolution: null;
        customfield_12413: '';
        customfield_13502: '';
        customfield_12412: '';
        customfield_13501: '';
        customfield_10500: null;
        customfield_12800: null;
        customfield_13856: null;
        customfield_12802: null;
        customfield_13858: null;
        customfield_12801: '';
        customfield_12804: '';
        customfield_12803: '';
        customfield_13859: null;
        customfield_12806: '';
        customfield_12805: '';
        customfield_12808: null;
        customfield_12807: null;
        customfield_12809: null;
        lastViewed: 'Today 10:58 AM';
        customfield_13850: null;
        priority: null;
        customfield_13852: null;
        customfield_13851: null;
        labels: null;
        customfield_11700: null;
        customfield_13845: null;
        customfield_13844: null;
        customfield_11702: '';
        customfield_13847: null;
        customfield_13846: null;
        aggregatetimeoriginalestimate: null;
        timeestimate: null;
        versions: null;
        customfield_13848: null;
        issuelinks: null;
        assignee: null;
        status: null;
        components: null;
        customfield_13200: null;
        customfield_13841: null;
        customfield_13840: null;
        customfield_13843: null;
        customfield_13842: null;
        customfield_13600: null;
        customfield_12503: '';
        customfield_12502: null;
        customfield_12900: '';
        aggregatetimeestimate: null;
        customfield_12902: '';
        customfield_12904: '';
        customfield_13839: '';
        creator: null;
        customfield_14000: null;
        subtasks: null;
        customfield_14003: '';
        customfield_14004: '';
        reporter: null;
        customfield_14001: null;
        customfield_14002: null;
        aggregateprogress: null;
        customfield_13314: null;
        customfield_13705: null;
        progress: null;
        votes: null;
        worklog: {
            startAt: 0;
            maxResults: 20;
            total: 0;
            worklogs: [];
        };
        issuetype: null;
        timespent: null;
        project: null;
        customfield_11000: null;
        aggregatetimespent: null;
        customfield_11004: null;
        customfield_11005: null;
        customfield_13820: '';
        customfield_13416: null;
        customfield_13812: null;
        customfield_13811: '';
        customfield_13814: null;
        customfield_13417: null;
        customfield_13813: null;
        customfield_13815: null;
        customfield_13818: '';
        resolutiondate: null;
        customfield_13819: '';
        workratio: null;
        watches: null;
        created: 'Today 9:12 AM';
        customfield_12600: null;
        customfield_13414: null;
        customfield_13810: '';
        customfield_11900: null;
        customfield_13803: null;
        customfield_13409: null;
        customfield_13805: null;
        customfield_13804: null;
        customfield_13806: null;
        customfield_13809: null;
        customfield_13808: null;
        updated: 'Today 9:12 AM';
        timeoriginalestimate: null;
        customfield_13001: '';
        description: string;
        customfield_13000: null;
        customfield_11100: null;
        customfield_13403: null;
        timetracking: {};
        customfield_12701: null;
        customfield_12700: '';
        attachment: [];
        summary: null;
        customfield_10001: null;
        customfield_12300: null;
        customfield_12415: null;
        customfield_13900: null;
        customfield_11600: null;
        customfield_13503: null;
        environment: '';
        customfield_13902: null;
        customfield_13904: '';
        duedate: null;
        comment: {
            comments: [];
            maxResults: 0;
            total: 0;
            startAt: 0;
        };
    };
    names: {[name in keyof IFields]: string};
}
