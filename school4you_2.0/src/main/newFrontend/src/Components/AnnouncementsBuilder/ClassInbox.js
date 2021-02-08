import React, { Component } from 'react'
import { FaBroadcastTower } from 'react-icons/fa'
import { date } from 'yup/lib/locale'
import CommunicationDataService from '../../api/CommunicationDataService'
import button from '../../Button/Button'
import Announcement from './Announcement'
import ClassAnnouncementForm from './ClassAnnouncementForm'

class ClassInbox extends Component {

    state = {
        classId : 0,
        announcements: [],
        showForm: false,
        initialSubject: '',
        initialContent: '',
        action: 'Erstellen',
        editing: false,
        editingId: 0,
        editingIndex: 0,
        ids : []
    }

    componentDidMount() {
        this.setState({classId : this.props.classId})
        CommunicationDataService.getClassAnnouncements(this.props.classId)
        .then(response => {
            console.log(response.data)
            this.setState({announcements : response.data})
        })
        .catch(error => {
            console.log(error)
        })

    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
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
            action: 'Erstellen',
            editing: false,
            editingId: 0,
            editingIndex: 0

        })
    }
    edit = (subject, content,id, index) => {
        this.setState({
            initialSubject: subject,
            initialContent: content,
            action: 'Ändern',
            editing: true,
            editingId: id,
            editingIndex: index
        })
        this.setState({ showForm: true })
        this.scrollToTop()

    }
    submitEdit = (id, subject, content) => {
        if (this.state.editing) {
            let neuData = {
                id: id,
                subject: subject,
                content: content
            }
            let announcements = this.state.announcements
            announcements[this.state.editingIndex] = neuData
            this.setState({ announcements: announcements })
        }
        this.reeinitialize()
    }

    submitCreate = (subject, content, id) => {
        let neuData = {
            id : id,
            subject: subject,
            content: content
        }
        let announcements = this.state.announcements
        announcements.unshift(neuData)
        this.setState({ announcements: announcements })
        this.reeinitialize()
    }
    delete = (id, index) => {
        
        let announcements = this.state.announcements
        announcements.splice(index, 1)
        this.setState({ announcements: announcements })
        this.reeinitialize()
        CommunicationDataService.deleteClassAnnouncement(id)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        //THE FORM ****************
        let form = null
        if (this.state.showForm) {
            form = <ClassAnnouncementForm
            classId = {this.props.classId}
                initialSubject={this.state.initialSubject}
                initialContent={this.state.initialContent}
                action={this.state.action}
                reeinitializeParent={this.reeinitialize}
                submitCreate={this.submitCreate}
                submitEdit={this.submitEdit}
                editingId={this.state.editingId}
            />
        }
        //***************************** */
        //ANNOUNCEMENTS
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
                        <Announcement
                        teacherControl={sessionStorage.getItem('role').toLocaleUpperCase() === 'TEACHER'}
                         key={announcement.id} subject={announcement.subject}
                            content={announcement.content}
                            date={announcement.creationDate}
                            edit={() => this.edit(announcement.subject, announcement.content,
                                announcement.id, index)}
                            delete={() => this.delete(announcement.id, index)}
                        />

                    )
                })
        }
        //***************************** */


        return (
            <div>

{    sessionStorage.getItem('role').toLocaleUpperCase() === 'TEACHER' && !this.state.editing && <button type="button" class="btn btn-dark btn-sm btn-block" onClick={this.toggleForm}>Erstellen + </button>
                }
                {form}
                {announcements}

            </div>
        )
    }
}

export default ClassInbox