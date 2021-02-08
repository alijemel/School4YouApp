import React, { Component } from 'react'
import { FaBroadcastTower } from 'react-icons/fa'
import { date } from 'yup/lib/locale'
import CommunicationDataService from '../../api/CommunicationDataService'
import button from '../../Button/Button'
import Announcement from './Announcement'
import AnnouncementForm from './AnnouncementForm'

class Inbox extends Component {
    state = {
        refreshed: false,
        role: '',
        announcements: [],
        showForm: false,
        initialSubject: '',
        initialContent: '',
        initialVisibility: [],
        action: 'Erstellen',
        editing: false,
        editingId: 0,
        editingIndex: 0
    }

    componentDidMount() {
        // if(!this.state.refreshed) {
        //     this.setState({refreshed : true})
        //      window.location.reload()
        // }
        // window.location.reload()

        let role = this.props.match.params.role
        this.setState({ role: role })
        CommunicationDataService.getInbox(role)
            .then(response => {
                console.log(response.data.announcements)
                this.setState({ announcements: response.data.announcements })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate() {
        if((this.props.match.params.role !== sessionStorage.getItem('role')) && (this.props.match.params.role !== this.state.role)) {
            let role = this.props.match.params.role
        this.setState({ role: role })
        CommunicationDataService.getInbox(role)
            .then(response => {
                console.log(response.data.announcements)
                this.setState({ announcements: response.data.announcements })
            })
            .catch(error => {
                console.log(error)
            })

        }
    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    edit = (subject, content, visibility, id, index) => {
        this.setState({
            initialSubject: subject,
            initialContent: content,
            initialVisibility: visibility,
            action: 'Ändern',
            editing: true,
            editingId: id,
            editingIndex: index
        })
        this.setState({ showForm: true })
        this.scrollToTop()

    }

    submitEdit = (id, subject, content, visibility) => {
        if (this.state.editing) {
            let neuData = {
                id: id,
                subject: subject,
                content: content,
                visibility: visibility
            }
            let announcements = this.state.announcements
            announcements[this.state.editingIndex] = neuData
            this.setState({ announcements: announcements })
        }
        this.reeinitialize()
    }
    submitCreate = (subject, content, visibility, id) => {
        let neuData = {
            id: id,
            subject: subject,
            content: content,
            visibility: visibility
        }
        let announcements = this.state.announcements
        announcements.unshift(neuData)
        this.setState({ announcements: announcements })
        this.reeinitialize()
    }


    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    reeinitialize = () => {
        this.setState({
            showForm: false,
            initialSubject: '',
            initialContent: '',
            initialVisibility: [],
            action: 'Erstellen',
            editing: false,
            editingId: 0,
            editingIndex: 0

        })
    }

    delete = (id, index) => {
        let announcements = this.state.announcements
        announcements.splice(index, 1)
        this.setState({ announcements: announcements })
        this.reeinitialize()
        CommunicationDataService.deleteAnnouncement(id)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    refresh = () => {
        window.location.reload(true)
    }


    render() {
        let form = null
        if (this.state.showForm) {
            form = <AnnouncementForm
                initialSubject={this.state.initialSubject}
                initialContent={this.state.initialContent}
                initialVisibility={this.state.initialVisibility}
                action={this.state.action}
                reeinitializeParent={this.reeinitialize}
                submitCreate={this.submitCreate}
                submitEdit={this.submitEdit}
                editingId={this.state.editingId}
            />
        }
        let announcements = null
        if (Array.isArray(this.state.announcements) && this.state.announcements.length <= 0) {
            announcements = <h3>
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </h3>
        } else {
            announcements =
                this.state.announcements.map((announcement, index) => {
                    return (
                        <Announcement key={announcement.id} subject={announcement.subject}
                            content={announcement.content}
                            date={announcement.creationDate}
                            edit={() => this.edit(announcement.subject, announcement.content, announcement.visibility,
                                announcement.id, index)}
                            delete={() => this.delete(announcement.id, index)}
                        />

                    )
                })
        }

        return (
            <div className="alert alert-info card" >

                {    sessionStorage.getItem('role').toLocaleUpperCase() === 'SECRETARY' && !this.state.editing && 
                <button type="button" class="btn btn-outline-dark btn-lg btn-block" onClick={this.toggleForm}>Erstellen + </button>
                }
                {/* {  <button type="button" class="btn btn-primary btn-sm" onClick={this.refresh}>refresh</button>
                } */}
                {form}

                {announcements}

            </div>
        )
    }
}

export default Inbox
