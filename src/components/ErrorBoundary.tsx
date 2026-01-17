
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <Box
                    className="flex items-center justify-center min-h-[400px] p-4"
                >
                    <Paper
                        elevation={3}
                        className="p-8 max-w-lg w-full text-center rounded-xl border-l-4 border-red-500"
                    >
                        <Box className="flex justify-center mb-4 text-red-500">
                            <AlertTriangle size={48} />
                        </Box>

                        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                            Algo deu errado
                        </Typography>

                        <Typography variant="body1" color="text.secondary" paragraph>
                            Ocorreu um erro inesperado ao carregar esta página.
                        </Typography>

                        {this.state.error && (
                            <Box className="mt-4 mb-6 p-3 bg-red-50 text-red-800 rounded text-left overflow-auto text-sm font-mono max-h-32 border border-red-100">
                                {this.state.error.toString()}
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<RefreshCw size={18} />}
                            onClick={this.handleReload}
                            sx={{ mt: 2 }}
                        >
                            Recarregar Página
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
