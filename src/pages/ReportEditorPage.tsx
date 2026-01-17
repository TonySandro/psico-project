import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    Stack,
    Avatar,
    IconButton,
    Paper,
    TextField,
    MenuItem,
    Switch,
    FormControlLabel,
    Chip,
    Divider,
    Tooltip,
    CircularProgress,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
    ChevronRight,
    Check,
    Bold,
    Italic,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List as ListIcon,
    ListOrdered,
    FileText,
    Printer,
    Save,
    X
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useGetReport, useUpdateReport, useUploadImage } from '@/hooks/useReports';
import { usePatient } from '@/hooks/usePatients';
import { useAutosave } from '@/hooks/useAutosave';
import { useWordCount } from '@/hooks/useWordCount';
import { formatDistanceToNow } from '@/utils/dateUtils';

const DEFAULT_TEMPLATE = `
<h1>Avaliação Neuropsicopedagógica</h1>

<h2>1. Identificação</h2>
<p>Paciente: [Nome do Paciente]</p>
<p>Idade: [Idade]</p>
<p>Data da Avaliação: [Data]</p>

<h2>2. Queixa Principal</h2>
<p>[Descreva a queixa principal aqui...]</p>

<h2>3. Instrumentos Utilizados</h2>
<ul>
  <li>Anamnese com os pais</li>
  <li>EOCA (Entrevista Operativa Centrada na Aprendizagem)</li>
  <li>TDE II (Teste de Desempenho Escolar)</li>
</ul>

<h2>4. Análise dos Resultados</h2>
<p><em>[Comece a digitar sua análise aqui...]</em></p>
`;

export default function ReportEditorPage() {
    const { reportId, patientId } = useParams<{ reportId?: string; patientId?: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const [title, setTitle] = useState('Avaliação Neuropsicopedagógica - Inicial');
    const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
    const [reportType, setReportType] = useState('Avaliação Inicial');
    const [isConfidential, setIsConfidential] = useState(false);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);

    const { data: report, isLoading: loadingReport } = useGetReport(reportId || '');
    const { data: patient } = usePatient(patientId || report?.patientId || '');
    const updateReport = useUpdateReport();
    const uploadImage = useUploadImage();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: DEFAULT_TEMPLATE,
        editorProps: {
            attributes: {
                class: 'ProseMirror',
            },
        },
    });

    const wordCount = useWordCount(editor);

    const { save, saveNow, status: saveStatus, lastSaved } = useAutosave({
        reportId: reportId || '',
        updateMutation: updateReport,
    });

    useEffect(() => {
        if (report && editor) {
            editor.commands.setContent(report.content);
            setTitle(report.title || title);
            setSessionDate(report.sessionDate || sessionDate);
            setReportType(report.reportType || reportType);
            setIsConfidential(report.isConfidential || false);
        }
    }, [report, editor]);

    useEffect(() => {
        if (!editor || !reportId) return;

        const handleUpdate = () => {
            const content = editor.getJSON();
            save(content);
        };

        editor.on('update', handleUpdate);

        return () => {
            editor.off('update', handleUpdate);
        };
    }, [editor, reportId, save]);

    const handleImageUpload = async (file: File) => {
        try {
            const url = await uploadImage.mutateAsync(file);
            editor?.chain().focus().setImage({ src: url }).run();
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    useEffect(() => {
        if (!editor) return;

        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
            const files = event.dataTransfer?.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    handleImageUpload(file);
                }
            }
        };

        const editorElement = editor.view.dom;
        editorElement.addEventListener('drop', handleDrop);

        return () => {
            editorElement.removeEventListener('drop', handleDrop);
        };
    }, [editor]);

    const toggleBold = () => editor?.chain().focus().toggleBold().run();
    const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
    const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
    const setAlignLeft = () => editor?.chain().focus().setTextAlign('left').run();
    const setAlignCenter = () => editor?.chain().focus().setTextAlign('center').run();
    const setAlignRight = () => editor?.chain().focus().setTextAlign('right').run();
    const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
    const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();

    const handleStyleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (!editor) return;

        switch (value) {
            case 'normal':
                editor.chain().focus().setParagraph().run();
                break;
            case 'h1':
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;
            case 'h2':
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case 'h3':
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                break;
        }
    };

    const handleManualSave = () => {
        if (!editor || !reportId) return;
        const content = editor.getJSON();
        saveNow(content);
    };

    const handleDiscard = () => {
        setShowDiscardDialog(true);
    };

    const confirmDiscard = () => {
        navigate(-1);
    };

    if (loadingReport) {
        return (
            <Box className="flex items-center justify-center min-h-screen">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="min-h-screen" sx={{ bgcolor: 'background.default' }}>
            {/* Top AppBar */}
            <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
                <Toolbar>
                    {/* Breadcrumb */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            onClick={() => navigate('/patients')}
                        >
                            Pacientes
                        </Typography>
                        <ChevronRight size={16} />
                        <Typography
                            variant="body2"
                            sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                            onClick={() => navigate(`/patients/${patient?.id}`)}
                        >
                            {patient?.name || 'Paciente'}
                        </Typography>
                        <ChevronRight size={16} />
                        <Typography variant="body2" fontWeight={600}>
                            {reportId ? 'Editar Relatório' : 'Novo Relatório'}
                        </Typography>
                    </Stack>

                    {/* Save Status */}
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 2 }}>
                        {saveStatus === 'saving' && (
                            <>
                                <CircularProgress size={16} />
                                <Typography variant="caption" color="text.secondary">
                                    Salvando...
                                </Typography>
                            </>
                        )}
                        {saveStatus === 'saved' && lastSaved && (
                            <>
                                <Check size={16} color="#10B981" />
                                <Typography variant="caption" color="text.secondary">
                                    Salvo {formatDistanceToNow(lastSaved)}
                                </Typography>
                            </>
                        )}
                        {saveStatus === 'error' && (
                            <Chip label="Erro ao salvar" color="error" size="small" />
                        )}
                    </Stack>

                    {/* Save Button */}
                    <Button
                        variant="contained"
                        startIcon={<Save size={18} />}
                        onClick={handleManualSave}
                        disabled={!reportId}
                        sx={{ mr: 2 }}
                    >
                        Salvar Relatório
                    </Button>

                    {/* User Avatar */}
                    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box className="flex" sx={{ maxWidth: '1400px', margin: '0 auto', p: 3 }}>
                {/* Editor Area */}
                <Box sx={{ flex: 1, mr: 3 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        {/* Document Header */}
                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    variant="standard"
                                    sx={{
                                        '& .MuiInput-input': {
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                        },
                                    }}
                                    fullWidth
                                />
                                <Button
                                    variant="outlined"
                                    startIcon={<X size={18} />}
                                    onClick={handleDiscard}
                                    sx={{ ml: 2 }}
                                >
                                    Descartar
                                </Button>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                Criado em {new Date(report?.createdAt || Date.now()).toLocaleDateString('pt-BR')} - {user?.name}
                            </Typography>
                        </Stack>

                        <Divider sx={{ mb: 3 }} />

                        {/* Toolbar */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 1,
                                mb: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                position: 'sticky',
                                top: 64,
                                bgcolor: 'background.paper',
                                zIndex: 10,
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                {/* Style Dropdown */}
                                <Select
                                    size="small"
                                    defaultValue="normal"
                                    onChange={handleStyleChange}
                                    sx={{ minWidth: 120 }}
                                >
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="h1">Heading 1</MenuItem>
                                    <MenuItem value="h2">Heading 2</MenuItem>
                                    <MenuItem value="h3">Heading 3</MenuItem>
                                </Select>

                                <Divider orientation="vertical" flexItem />

                                {/* Format Buttons */}
                                <Tooltip title="Bold">
                                    <IconButton
                                        size="small"
                                        onClick={toggleBold}
                                        sx={{
                                            bgcolor: editor?.isActive('bold') ? 'primary.light' : 'transparent',
                                        }}
                                    >
                                        <Bold size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Italic">
                                    <IconButton
                                        size="small"
                                        onClick={toggleItalic}
                                        sx={{
                                            bgcolor: editor?.isActive('italic') ? 'primary.light' : 'transparent',
                                        }}
                                    >
                                        <Italic size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Underline">
                                    <IconButton
                                        size="small"
                                        onClick={toggleUnderline}
                                        sx={{
                                            bgcolor: editor?.isActive('underline') ? 'primary.light' : 'transparent',
                                        }}
                                    >
                                        <UnderlineIcon size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Divider orientation="vertical" flexItem />

                                {/* Align Buttons */}
                                <Tooltip title="Align Left">
                                    <IconButton size="small" onClick={setAlignLeft}>
                                        <AlignLeft size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Align Center">
                                    <IconButton size="small" onClick={setAlignCenter}>
                                        <AlignCenter size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Align Right">
                                    <IconButton size="small" onClick={setAlignRight}>
                                        <AlignRight size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Divider orientation="vertical" flexItem />

                                {/* List Buttons */}
                                <Tooltip title="Bullet List">
                                    <IconButton
                                        size="small"
                                        onClick={toggleBulletList}
                                        sx={{
                                            bgcolor: editor?.isActive('bulletList') ? 'primary.light' : 'transparent',
                                        }}
                                    >
                                        <ListIcon size={18} />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Numbered List">
                                    <IconButton
                                        size="small"
                                        onClick={toggleOrderedList}
                                        sx={{
                                            bgcolor: editor?.isActive('orderedList') ? 'primary.light' : 'transparent',
                                        }}
                                    >
                                        <ListOrdered size={18} />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Paper>

                        {/* Editor */}
                        <Box className="report-paper">
                            <EditorContent editor={editor} />
                        </Box>
                    </Paper>
                </Box>

                {/* Sidebar */}
                <Paper
                    sx={{
                        width: 280,
                        position: 'sticky',
                        top: 80,
                        height: 'fit-content',
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Stack spacing={3} sx={{ p: 2 }}>
                        {/* Configurações */}
                        <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                CONFIGURAÇÕES
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    type="date"
                                    label="Data da Sessão"
                                    value={sessionDate}
                                    onChange={(e) => setSessionDate(e.target.value)}
                                    fullWidth
                                    size="small"
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                    }}
                                />
                                <TextField
                                    select
                                    label="Tipo de Relatório"
                                    value={reportType}
                                    onChange={(e) => setReportType(e.target.value)}
                                    fullWidth
                                    size="small"
                                >
                                    <MenuItem value="Avaliação Inicial">Avaliação Inicial</MenuItem>
                                    <MenuItem value="Reavaliação">Reavaliação</MenuItem>
                                    <MenuItem value="Relatório de Acompanhamento">Relatório de Acompanhamento</MenuItem>
                                    <MenuItem value="Relatório Final">Relatório Final</MenuItem>
                                </TextField>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={isConfidential}
                                            onChange={(e) => setIsConfidential(e.target.checked)}
                                        />
                                    }
                                    label="Confidencial"
                                />
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Anexos */}
                        <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                ANEXOS
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                                Nenhum anexo adicionado
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                size="small"
                                disabled
                            >
                                + Adicionar
                            </Button>
                        </Box>

                        <Divider />

                        {/* Exportar */}
                        <Box>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                                EXPORTAR
                            </Typography>
                            <Stack spacing={1}>
                                <Button
                                    variant="outlined"
                                    startIcon={<FileText size={18} />}
                                    fullWidth
                                    size="small"
                                    disabled
                                >
                                    Word
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<FileText size={18} />}
                                    fullWidth
                                    size="small"
                                    disabled
                                >
                                    PDF
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Printer size={18} />}
                                    fullWidth
                                    size="small"
                                    disabled
                                >
                                    Imprimir
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            </Box>

            {/* Footer */}
            <AppBar
                position="fixed"
                sx={{
                    top: 'auto',
                    bottom: 0,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                }}
            >
                <Toolbar variant="dense">
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="caption" color="text.secondary">
                            Página 1 de 1
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {wordCount} palavras
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Discard Dialog */}
            <Dialog open={showDiscardDialog} onClose={() => setShowDiscardDialog(false)}>
                <DialogTitle>Descartar alterações?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Tem certeza que deseja descartar este relatório? As alterações não salvas serão perdidas.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDiscardDialog(false)}>Cancelar</Button>
                    <Button onClick={confirmDiscard} color="error" variant="contained">
                        Descartar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
