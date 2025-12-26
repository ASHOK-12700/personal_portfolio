
import { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Download, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
        type: null,
        message: ''
    });

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: null, message: '' });

        if (!formRef.current) return;

        // Replace these with your actual EmailJS credentials
        // It's best practice to use environment variables
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

        if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
            setStatus({
                type: 'error',
                message: 'Please configure your EmailJS credentials in the .env file.'
            });
            setIsLoading(false);
            return;
        }

        emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
            .then((result) => {
                console.log(result.text);
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! I will get back to you soon.'
                });
                formRef.current?.reset();
            }, (error) => {
                console.log(error.text);
                setStatus({
                    type: 'error',
                    message: `Failed to send message: ${error.text || 'Unknown error'}. Please try again.`
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 text-white">Get In Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Looking to connect or collaborate? Get in touch to discuss projects, ideas, or opportunities. I’m always open to building meaningful, innovative, and impactful digital experiences together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 p-8 rounded-2xl shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email Me</p>
                                    <a href="mailto:ashoksriivassivakiran.143@gmail.com" className="text-white hover:text-blue-400 transition-colors block">
                                        ashoksriivassivakiran.143@gmail.com
                                    </a>
                                    <a href="mailto:ashoksriivassivakiran@gmail.com" className="text-white hover:text-blue-400 transition-colors block">
                                        ashoksriivassivakiran@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Call Me</p>
                                    <p className="text-white">9581720429</p>
                                    <p className="text-white">9966575468</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Location</p>
                                    <p className="text-white">East Godavari District, Andhra Pradesh (near Yanam)</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <a
                                href="https://github.com/ASHOK-12700/my-vault.git"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1 w-full justify-center sm:w-auto"
                            >
                                <Download size={20} />
                                view my resume
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-900 p-8 rounded-2xl shadow-xl"
                    >
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Your Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your name "
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Your Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-32"
                                    placeholder="Write some short description for you"
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-white text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div >
        </section >
    );
};

export default Contact;
