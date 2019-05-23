import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {
    state = {
        ClientId:'77b29999700e41ed2a61',
        ClientSecret:'e4b0aabbed244021ff063e64c17350a9b673d6a3',
        count:5,
        sort: 'created : asc ',
        repos: []
    }

    componentDidMount() {
        const { username } = this.props;
        const {count, sort , ClientId , ClientSecret} = this.state;


        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=#${ClientId}&client_secret=${ClientSecret}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ repos : data})
            }).catch(err => console.log(err))
    }

    render() {
        const { repos } = this.state;

        const repoItems = repos.map((repo) => (
            <div key={repo.id} className="card card-body mb-2">
                <div className='row'>
                    <div className='col-md-6'>
                        <h4>
                            <Link to={repo.html_url} className='text-info'>{repo.name}</Link>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span class="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span class="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div>
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        )
    }
}

export default ProfileGithub;